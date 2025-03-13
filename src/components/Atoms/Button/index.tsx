import React from "react";
import { ButtonProps } from "./types";
import BootstrapButton from "react-bootstrap/Button";
import styles from "./Button.module.scss";
import classNames from "classnames";

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <BootstrapButton
      className={classNames(styles.Button, className)}
      {...props}
    />
  );
};

export { Button };
