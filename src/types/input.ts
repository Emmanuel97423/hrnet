export type InputProps = {
    label?: string;
    type?: "text" | "password" | "email" | "number";
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    min?: number;
    max?: number;
    step?: number;
    pattern?: string;
    title?: string;
    autoComplete?: string;
    autoFocus?: boolean;
}