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
  longitud: string;
  latitud: string;
}

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  fechai: Date;
  fechaf: Date;
  extendedProps: EventExtendedProps;
}

interface CreateEvent {
  nombre: string;
  descripcion: string;
  propietario: string;
  fecha_inicial: string;
  fecha_final: string;
  lugar: string;
  latitud?: string;
  longitud?: string;
  oficio: string;
  estimado: number;
}

interface ReadAllEvents extends FetchInterface {
  data: Event[];
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
};
