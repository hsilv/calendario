import { createContext } from "react";

interface CalendarContextProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  viewMode: "month" | "week" | "agenda";
  setViewMode: (mode: "month" | "week" | "agenda") => void;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined
);

export { CalendarContext };
export type { CalendarContextProps };
