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
  fechai: string;
  fechaf: string;
  extendedProps: EventExtendedProps;
}

interface ReadAllEvents extends FetchInterface {
  data: Event[];
}

interface ReadEvent extends FetchInterface {
  data: Event;
}

export type { Event, EventExtendedProps, ReadAllEvents, ReadEvent };
