import { ReactNode, useState } from "react";
import { CalendarContext } from "./context";

export const CalendarProvider: React.FC<{
  children: ReactNode;
  initialDate?: Date;
}> = ({ children, initialDate }) => {
  const [currentDate, setCurrentDate] = useState<Date>(
    initialDate || new Date()
  );
  const [viewMode, setViewMode] = useState<"mes" | "semana" | "agenda">("mes");

  return (
    <CalendarContext.Provider
      value={{ currentDate, setCurrentDate, viewMode, setViewMode }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
