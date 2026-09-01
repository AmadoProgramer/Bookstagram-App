export interface Opinion {
  id_opinion: number;
  id_usuario: number;
  id_libro: number;
  texto: string;
  puntuacion: number;
  fecha_creacion: Date;
}
