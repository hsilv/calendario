import { forwardRef } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { InputProps } from "./types";
import { Form, FormControl } from "react-bootstrap";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ suffix, prefix, label, ...props }, ref) => {
    return (
      <>
        {label && <Form.Label>{label}</Form.Label>}
        <InputGroup>
          {prefix && <InputGroup.Text>{prefix}</InputGroup.Text>}
          <FormControl ref={ref} {...props} />
          {suffix && <InputGroup.Text>{suffix}</InputGroup.Text>}
        </InputGroup>
      </>
    );
  }
);

export { Input };
