export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  username: string;
  password: string;
  bio?: string;
  avatar_url?: string;
  xp: number;
  seguidores: number;
  seguidos: number;
  fecha_creacion: Date;
}
