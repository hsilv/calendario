import React from "react";
import { ButtonProps } from "./types";
import BootstrapButton from "react-bootstrap/Button";
import styles from "./IconButton.module.scss";
import classNames from "classnames";

const IconButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <BootstrapButton
      className={classNames(styles.Button, className)}
      {...props}
    />
  );
};

export { IconButton };
