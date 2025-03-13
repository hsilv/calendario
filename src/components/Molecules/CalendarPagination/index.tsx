import { Button, IconButton } from "@components/Atoms";
import BootstrapButtonGroup from "react-bootstrap/ButtonGroup";
import { MdKeyboardArrowLeft } from "react-icons/md";

import React from "react";
import classNames from "classnames";
import styles from "./CalendarPagination.module.scss";

const CalendarPagination: React.FC = () => {
  return (
    <div className={classNames(styles.Container)}>
      <BootstrapButtonGroup className={classNames(styles.ButtonGroup)}>
        <IconButton className={classNames(styles.IconButton)}>
          <MdKeyboardArrowLeft className={classNames(styles.Icon)} />
        </IconButton>
        <IconButton className={classNames(styles.IconButton)}>
          <MdKeyboardArrowLeft
            className={classNames(styles.Icon, styles.Reverse)}
          />
        </IconButton>
      </BootstrapButtonGroup>
      <Button className={classNames(styles.Button)}>HOY</Button>
    </div>
  );
};

export { CalendarPagination };
