export type InputProps = {
    label: string;
    type?: string ;
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
    options?: OptionsArray[];
}

type OptionsArray = {
    name:string;
    abbreviation:string;
}