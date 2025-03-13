import { forwardRef } from "react";
import BootstrapForm from "react-bootstrap/Form";
import { CheckboxProps } from "./types";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <BootstrapForm.Check label={label} ref={ref} {...props} type="checkbox" />
    );
  }
);

export { Checkbox };
