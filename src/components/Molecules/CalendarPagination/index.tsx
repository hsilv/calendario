import { Button, IconButton } from "@components/Atoms";
import BootstrapButtonGroup from "react-bootstrap/ButtonGroup";
import { MdKeyboardArrowLeft } from "react-icons/md";

import React from "react";
import classNames from "classnames";
import styles from "./CalendarPagination.module.scss";
import { CalendarPaginationProps } from "./types";

const CalendarPagination: React.FC<CalendarPaginationProps> = ({
  onToday,
  onNext,
  onPrev,
}) => {
  return (
    <div className={classNames(styles.Container)}>
      <BootstrapButtonGroup className={classNames(styles.ButtonGroup)}>
        <IconButton className={classNames(styles.IconButton)} onClick={onPrev}>
          <MdKeyboardArrowLeft className={classNames(styles.Icon)} />
        </IconButton>
        <IconButton className={classNames(styles.IconButton)} onClick={onNext}>
          <MdKeyboardArrowLeft
            className={classNames(styles.Icon, styles.Reverse)}
          />
        </IconButton>
      </BootstrapButtonGroup>
      <Button className={classNames(styles.Button)} onClick={onToday}>
        HOY
      </Button>
    </div>
  );
};

export { CalendarPagination };
