import { FetchInterface } from "../fetch";

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

interface ReadParqueo {
  id: string;
  descripcion: string;
  direccion: string;
  capacidad: number;
  reservados: number;
  latitud: number;
  longitud: number;
  observaciones?: string;
}

interface ReadParkings extends FetchInterface {
  data: ReadParqueo[];
}

export type { Parqueo, ReadParkings, ReadParqueo };
