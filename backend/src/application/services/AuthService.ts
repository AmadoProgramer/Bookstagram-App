import jwt, { SignOptions, verify as jwtVerify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export class AuthService {
  private readonly jwtSecret: string = process.env.JWT_SECRET || 'your_secret_key';
  private readonly jwtExpiresIn: string = process.env.JWT_EXPIRES_IN || '7d';

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  generateToken(userId: number): string {
    const options: SignOptions & { expiresIn: number } = { expiresIn: parseInt(this.jwtExpiresIn) };
    return jwt.sign({ userId }, this.jwtSecret, options as SignOptions);
  }

  verifyToken(token: string): any {
    try {
      return jwtVerify(token, this.jwtSecret);
    } catch (error) {
      return null;
    }
  }

  decodeToken(token: string): any {
    return jwt.decode(token);
  }
}
