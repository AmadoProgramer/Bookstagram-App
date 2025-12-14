import { Request, Response } from 'express';
import { UsuarioService } from '../../application/services/UsuarioService';
import { AuthService } from '../../application/services/AuthService';
import { UsuarioAdapter } from '../adapter/UsuarioAdapter';

export class AuthController {
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private usuarioAdapter: UsuarioAdapter
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, email, username, password, bio, avatar_url } = req.body;

      // Validar campos requeridos
      if (!nombre || !email || !username || !password) {
        res.status(400).json({ 
          error: 'Campos requeridos: nombre, email, username, password' 
        });
        return;
      }

      // Verificar si el email ya existe
      const existingEmail = await this.usuarioAdapter.findByEmail(email);
      if (existingEmail) {
        res.status(400).json({ error: 'El email ya está registrado' });
        return;
      }

      // Verificar si el username ya existe
      const existingUsername = await this.usuarioAdapter.findByUsername(username);
      if (existingUsername) {
        res.status(400).json({ error: 'El username ya está registrado' });
        return;
      }

      // Hash de la contraseña
      const hashedPassword = await this.authService.hashPassword(password);

      // Crear usuario
      const usuario = await this.usuarioService.createUsuario({
        nombre,
        email,
        username,
        password: hashedPassword,
        bio,
        avatar_url,
      });

      // Generar token
      const token = this.authService.generateToken(usuario.id_usuario);

      // No devolver la contraseña en la respuesta
      const { password: _, ...usuarioSinPassword } = usuario as any;

      res.status(201).json({
        user: usuarioSinPassword,
        tokens: {
          accessToken: token,
          refreshToken: token, // En producción, usar refresh tokens diferentes
        },
      });
    } catch (error) {
      console.error('Error en register:', error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validar campos
      if (!email || !password) {
        res.status(400).json({ error: 'Email y password son requeridos' });
        return;
      }

      // Buscar usuario por email
      const usuario = await this.usuarioAdapter.findByEmail(email);
      if (!usuario) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }

      // Verificar contraseña
      const isPasswordValid = await this.authService.comparePasswords(
        password,
        usuario.password
      );
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }

      // Generar token
      const token = this.authService.generateToken(usuario.id_usuario);

      // No devolver la contraseña
      const { password: _, ...usuarioSinPassword } = usuario;

      res.json({
        user: usuarioSinPassword,
        tokens: {
          accessToken: token,
          refreshToken: token,
        },
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      // En una implementación real, invalidarías el token en una blacklist
      res.json({ message: 'Logout exitoso' });
    } catch (error) {
      console.error('Error en logout:', error);
      res.status(500).json({ error: 'Error al cerrar sesión' });
    }
  }

  async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      
      if (!userId) {
        res.status(401).json({ error: 'No autorizado' });
        return;
      }

      const usuario = await this.usuarioService.getUsuarioById(userId);
      if (!usuario) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.json(usuario);
    } catch (error) {
      console.error('Error en getCurrentUser:', error);
      res.status(500).json({ error: 'Error al obtener usuario actual' });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({ error: 'Refresh token requerido' });
        return;
      }

      const decoded = this.authService.verifyToken(refreshToken);
      if (!decoded) {
        res.status(401).json({ error: 'Token inválido' });
        return;
      }

      // Generar nuevo token
      const newToken = this.authService.generateToken(decoded.userId);

      res.json({
        accessToken: newToken,
      });
    } catch (error) {
      console.error('Error en refreshToken:', error);
      res.status(500).json({ error: 'Error al refrescar token' });
    }
  }
}