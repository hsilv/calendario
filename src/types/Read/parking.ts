interface Parqueo {
  id: string;
  descripcion: string;
  direccion: string;
  capacidad: number;
  reservados: number;
  lat: number;
  lng: number;
  observaciones?: string;
}

export type { Parqueo };
