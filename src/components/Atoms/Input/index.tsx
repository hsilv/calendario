import { forwardRef } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { InputProps } from "./types";
import { Form, FormControl } from "react-bootstrap";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ suffix, prefix, label, value, ...props }, ref) => {
    // Asegurarse de que el valor sea siempre un string o number
    const parsedValue = Array.isArray(value) ? value[0] : value;

    return (
      <>
        {label && <Form.Label>{label}</Form.Label>}
        <InputGroup>
          {prefix && <InputGroup.Text>{prefix}</InputGroup.Text>}
          <FormControl ref={ref} value={parsedValue} {...props} />
          {suffix && <InputGroup.Text>{suffix}</InputGroup.Text>}
        </InputGroup>
      </>
    );
  }
);

export { Input };
