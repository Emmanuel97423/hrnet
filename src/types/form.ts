import type { InputProps } from "@/types/input"
import type { Employee } from "@/types/employee"

export type FormProps = {
    formFields: InputProps[];
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>, label:string) => void;
    formData?:Employee;
}

