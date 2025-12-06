import { DataSource } from 'typeorm';
import { environmentVars } from './environment-vars';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { LibroEntity } from '../entities/LibroEntity';
import { OpinionEntity } from '../entities/OpinionEntity';
import { OpinionLikeEntity } from '../entities/OpinionLikeEntity';
import { ProgresoLibroEntity } from '../entities/ProgresoLibroEntity';
import { UsuarioLibroEntity } from '../entities/UsuarioLibroEntity';
import { ConversacionEntity } from '../entities/ConversacionEntity';
import { MensajeEntity } from '../entities/MensajeEntity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: environmentVars.database.host,
  port: environmentVars.database.port,
  username: environmentVars.database.user,
  password: environmentVars.database.password,
  database: environmentVars.database.database,
  synchronize: environmentVars.nodeEnv === 'development',
  logging: environmentVars.nodeEnv === 'development',
  entities: [
    UsuarioEntity,
    LibroEntity,
    OpinionEntity,
    OpinionLikeEntity,
    ProgresoLibroEntity,
    UsuarioLibroEntity,
    ConversacionEntity,
    MensajeEntity,
  ],
  subscribers: [],
  migrations: [],
});
