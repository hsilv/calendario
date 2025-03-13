import { FormControlProps } from "react-bootstrap";

interface InputProps extends FormControlProps {
  prefix?: string;
  suffix?: string;
  label?: string;
}

export type { InputProps };
