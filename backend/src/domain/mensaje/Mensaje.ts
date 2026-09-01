export interface Mensaje {
  id_mensaje: number;
  id_conversacion: number;
  id_usuario_emisor: number;
  texto: string;
  fecha_creacion: Date;
}
