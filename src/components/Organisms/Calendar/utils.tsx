import { Event } from "../../../types/Read/events";

const daysOfWeek = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getStartDayOfWeek = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const getEndDayOfWeek = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDay();
};

const transformDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const transformEvents = (events: Event[]): Event[] => {
  return events.map((event) => ({
    ...event,
    fechai: transformDate(event.start as string),
    fechaf: transformDate(event.start as string),
  }));
};

export {
  getDaysInMonth,
  getStartDayOfWeek,
  getEndDayOfWeek,
  daysOfWeek,
  transformDate,
  transformEvents,
};
