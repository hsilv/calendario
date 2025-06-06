import { Event } from "../../../types/Read/events";

const events: Event[] = [
  {
    estimado: 0,
    id: "1",
    title: "Evento 1",
    extendedProps: {
      categoria: "categoria 1",
      descripcion: "descripcion 1",
      lugar: "lugar 1",
      oficio: "oficio 1",
      propietario: "propietario 1",
      tipo: "tipo 1",
      longitud: -34.603722,
      latitud: -58.381592,
    },
    parqueos: [],
    status: "ACTIVO",
    start: "09/03/2025",
    end: "09/03/2025",
    fechai: new Date(),
    fechaf: new Date(),
    horaf: "22:33:00",
    horai: "22:33:00",
    parqueosDisponibles: 50,
  },
];

export { events };
