import { EventProps } from "@/components/Molecules/Event/types";

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

const events: EventProps[] = [
  {
    name: "Manifestación de estudiantes de Universidad San Carlos",
    desc: "Descripción del Evento 1",
    place: "Lugar 1",
    init_date: new Date(currentYear, currentMonth, 5, 10, 0),
    final_date: new Date(currentYear, currentMonth, 5, 12, 0),
    lat: 51.505,
    lng: -0.09,
    parkings: 50,
  },
  {
    name: "Evento 5",
    desc: "Descripción del Evento 1",
    place: "Lugar 1",
    init_date: new Date(currentYear, currentMonth, 5, 10, 0),
    final_date: new Date(currentYear, currentMonth, 5, 12, 0),
    lat: 51.505,
    lng: -0.09,
    parkings: 50,
  },
  {
    name: "Evento 2",
    desc: "Descripción del Evento 2",
    place: "Lugar 2",
    init_date: new Date(currentYear, currentMonth, 12, 14, 0),
    final_date: new Date(currentYear, currentMonth, 12, 16, 0),
    lat: 51.515,
    lng: -0.1,
    parkings: 30,
  },
  {
    name: "Evento 3",
    desc: "Descripción del Evento 3",
    place: "Lugar 3",
    init_date: new Date(currentYear, currentMonth, 20, 9, 0),
    final_date: new Date(currentYear, currentMonth, 20, 11, 0),
    lat: 51.525,
    lng: -0.11,
    parkings: 20,
  },
];

export { events };
