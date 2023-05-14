import { createContext } from 'react';
import type { Employee } from '@/types/employee';

// Définition du type pour le contexte
interface FormContextProps {
  formData: Employee;
  setFormData: (value: Employee) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    label: string,
    date?: string
  ) => void;
}

// Création du contexte avec une valeur initiale vide
const FormContext = createContext<FormContextProps>({
  formData: {},
  setFormData: () => {},
  handleSubmit: () => {},
  handleOnChange: () => {}
});

export default FormContext;
