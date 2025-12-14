import { Repository } from 'typeorm';
import { LibroPort } from '../../domain/libro/LibroPort';
import { Libro } from '../../domain/libro/Libro';
import { LibroEntity } from '../entities/LibroEntity';

export class LibroAdapter implements LibroPort {
  constructor(private libroRepository: Repository<LibroEntity>) {}

  async create(libro: Libro): Promise<Libro> {
    const entity = this.libroRepository.create(libro);
    const saved = await this.libroRepository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<Libro | null> {
    const entity = await this.libroRepository.findOne({ where: { id_libro: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Libro[]> {
    const entities = await this.libroRepository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async findByCategory(categoria: string): Promise<Libro[]> {
    const entities = await this.libroRepository.find({ where: { categoria } });
    return entities.map((e) => this.toDomain(e));
  }

  async findByAuthor(autor: string): Promise<Libro[]> {
    const entities = await this.libroRepository.find({ where: { autor } });
    return entities.map((e) => this.toDomain(e));
  }

  async update(id: number, libro: Partial<Libro>): Promise<Libro> {
    await this.libroRepository.update({ id_libro: id }, libro);
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.libroRepository.delete({ id_libro: id });
    return (result.affected ?? 0) > 0;
  }

  async search(query: string): Promise<Libro[]> {
    const entities = await this.libroRepository
      .createQueryBuilder('libro')
      .where('libro.titulo LIKE :query', { query: `%${query}%` })
      .orWhere('libro.autor LIKE :query', { query: `%${query}%` })
      .orWhere('libro.descripcion LIKE :query', { query: `%${query}%` })
      .getMany();

    return entities.map((e) => this.toDomain(e));
  }

  private toDomain(entity: LibroEntity): Libro {
    return {
      id_libro: entity.id_libro,
      titulo: entity.titulo,
      autor: entity.autor,
      portada_url: entity.portada_url,
      categoria: entity.categoria,
      descripcion: entity.descripcion,
      fecha_publicacion: entity.fecha_publicacion,
    };
  }
}
