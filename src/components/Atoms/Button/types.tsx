type ButtonVariant = "primary" | "secondary" | "success" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export type { ButtonProps };
