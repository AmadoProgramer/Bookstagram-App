import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsuarioLibroEntity } from './UsuarioLibroEntity';
import { OpinionEntity } from './OpinionEntity';

@Entity('libros')
export class LibroEntity {
  @PrimaryGeneratedColumn()
  id_libro!: number;

  @Column({ type: 'varchar', length: 255 })
  titulo!: string;

  @Column({ type: 'varchar', length: 255 })
  autor!: string;

  @Column({ type: 'varchar', length: 500 })
  portada_url!: string;

  @Column({ type: 'varchar', length: 100 })
  categoria!: string;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({ type: 'date' })
  fecha_publicacion!: Date;

  @OneToMany(() => OpinionEntity, (opinion) => opinion.libro)
  opiniones!: OpinionEntity[];

  @OneToMany(() => UsuarioLibroEntity, (usuarioLibro) => usuarioLibro.libro)
  usuarios!: UsuarioLibroEntity[];
}
