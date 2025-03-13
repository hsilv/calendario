import React, { useState } from "react";
import styles from "./CalendarDisplayOptions.module.scss";
import classNames from "classnames";
import BootstrapButtonGroup from "react-bootstrap/ButtonGroup";
import { Button } from "@components/Atoms";

const options = ["MES", "SEMANA", "AGENDA"];

const CalendarDisplayOptions: React.FC = () => {
  const [activeOption, setActiveOption] = useState("MES");

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
