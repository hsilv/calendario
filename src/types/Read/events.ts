import { FetchInterface } from "../fetch";

interface EventExtendedProps {
  descripcion: string;
  propietario: string;
  lugar: string;
  oficio: string;
  chapa?: string;
  tipo: string;
  categoria: string;
  foto?: string;
  longitud: number;
  latitud: number;
}

interface Parqueo {
  capacidad: string;
  descripcion: string;
  direccion: string;
  id: string;
  latitud: number;
  longitud: number;
  observaciones?: string;
  reservados: string;
  ruta_foto?: string;
}

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  fechai: Date;
  fechaf: Date;
  horai: string;
  horaf: string;
  estimado: number;
  parqueos: Parqueo[];
  parqueosDisponibles: number;
  extendedProps: EventExtendedProps;
}

interface CreateEvent {
  nombre: string;
  descripcion: string;
  propietario: string;
  fecha_inicial: string;
  fecha_final: string;
  lugar: string;
  latitud: number;
  longitud: number;
  oficio?: string;
  estimado: number;
}

interface ReadAllEvents extends FetchInterface {
  data: Event[];
}

interface CreatedEvent extends FetchInterface {
  data: {
    success: string;
    data: Event;
  };
}

interface ReadEvent extends FetchInterface {
  data: Event;
}

export type {
  Event,
  EventExtendedProps,
  ReadAllEvents,
  ReadEvent,
  CreateEvent,
  CreatedEvent,
};
