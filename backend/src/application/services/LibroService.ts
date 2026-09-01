import { LibroPort } from '../../domain/libro/LibroPort';
import { LibroCreateDTO } from '../dtos/libro/LibroCreateDTO';
import { LibroResponseDTO } from '../dtos/libro/LibroResponseDTO';
import { LibroUpdateDTO } from '../dtos/libro/LibroUpdateDTO';
import { Libro } from '../../domain/libro/Libro';

export class LibroService {
  constructor(private libroPort: LibroPort) {}

  async createLibro(dto: LibroCreateDTO): Promise<LibroResponseDTO> {
    const libro: Libro = {
      id_libro: 0,
      ...dto,
    };

    const created = await this.libroPort.create(libro);
    return this.toDTO(created);
  }

  async getLibroById(id: number): Promise<LibroResponseDTO | null> {
    const libro = await this.libroPort.findById(id);
    return libro ? this.toDTO(libro) : null;
  }

  async getAllLibros(): Promise<LibroResponseDTO[]> {
    const libros = await this.libroPort.findAll();
    return libros.map((l) => this.toDTO(l));
  }

  async getLibrosByCategory(categoria: string): Promise<LibroResponseDTO[]> {
    const libros = await this.libroPort.findByCategory(categoria);
    return libros.map((l) => this.toDTO(l));
  }

  async getLibrosByAuthor(autor: string): Promise<LibroResponseDTO[]> {
    const libros = await this.libroPort.findByAuthor(autor);
    return libros.map((l) => this.toDTO(l));
  }

  async searchLibros(query: string): Promise<LibroResponseDTO[]> {
    const libros = await this.libroPort.search(query);
    return libros.map((l) => this.toDTO(l));
  }

  async updateLibro(id: number, dto: LibroUpdateDTO): Promise<LibroResponseDTO> {
    const updated = await this.libroPort.update(id, dto);
    return this.toDTO(updated);
  }

  async deleteLibro(id: number): Promise<boolean> {
    return await this.libroPort.delete(id);
  }

  private toDTO(libro: Libro): LibroResponseDTO {
    const dto = new LibroResponseDTO();
    Object.assign(dto, libro);
    return dto;
  }
}
