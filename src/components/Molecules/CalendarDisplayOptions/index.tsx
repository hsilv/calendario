import React, { useContext, useEffect, useState } from "react";
import styles from "./CalendarDisplayOptions.module.scss";
import classNames from "classnames";
import BootstrapButtonGroup from "react-bootstrap/ButtonGroup";
import { Button } from "@components/Atoms";
import { CalendarContext } from "@/context/Calendar/context";

const options = ["mes", "semana", "agenda"] as const;
type Options = (typeof options)[number];

const CalendarDisplayOptions: React.FC = () => {
  const [activeOption, setActiveOption] = useState<Options>("mes");
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("CalendarHeader must be used within a CalendarProvider");
  }

  const { setViewMode } = context;

  useEffect(() => {
    setViewMode(activeOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOption]);

  return (
    <div className={classNames(styles.Container)}>
      <BootstrapButtonGroup>
        {options.map((option) => (
          <Button
            key={option}
            className={classNames(styles.Button, {
              [styles.Active]: activeOption === option,
            })}
            onClick={() => setActiveOption(option)}
          >
            {option}
          </Button>
        ))}
      </BootstrapButtonGroup>
    </div>
  );
};

export { CalendarDisplayOptions };
