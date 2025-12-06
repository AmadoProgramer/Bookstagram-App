import { Libro } from './Libro';

export interface LibroPort {
  create(libro: Libro): Promise<Libro>;
  findById(id: number): Promise<Libro | null>;
  findAll(): Promise<Libro[]>;
  findByCategory(categoria: string): Promise<Libro[]>;
  findByAuthor(autor: string): Promise<Libro[]>;
  update(id: number, libro: Partial<Libro>): Promise<Libro>;
  delete(id: number): Promise<boolean>;
  search(query: string): Promise<Libro[]>;
}
