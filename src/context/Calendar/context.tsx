import { createContext } from "react";

interface CalendarContextProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  viewMode: "mes" | "semana" | "agenda";
  setViewMode: (mode: "mes" | "semana" | "agenda") => void;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined
);

export { CalendarContext };
export type { CalendarContextProps };
