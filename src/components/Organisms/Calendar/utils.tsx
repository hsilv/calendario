const daysOfWeek = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getStartDayOfWeek = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

const getEndDayOfWeek = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDay();
};

export { getDaysInMonth, getStartDayOfWeek, getEndDayOfWeek, daysOfWeek };
