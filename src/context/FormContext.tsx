import { createContext, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ReactNode } from 'react';
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
  saveEmployee: (employee: Employee) => void;
}

// Création du contexte avec une valeur initiale vide
const FormContext = createContext<FormContextProps>({
  formData: {},
  setFormData: () => {},
  handleSubmit: () => {},
  handleOnChange: () => {},
  saveEmployee: () => {}
});

// Création du provider pour le contexte
export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [formData, setFormData] = useState<Employee>({
    firstname: '',
    lastname: '',
    birthday: '',
    start: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    department: ''
  });

  const [storedValue, saveEmployee, deleteEmployee] = useLocalStorage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    saveEmployee(formData);
  };
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: string,
    date?: string
  ) => {
    e.stopPropagation();
    setFormData({
      ...formData,
      [label.toLowerCase().replace(/\s/g, '')]: e.target.value
    });
    console.log('formData:', formData);
  };

  const contextValue: FormContextProps = {
    formData,
    setFormData,
    handleSubmit,
    handleOnChange,
    saveEmployee
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export default FormContext;
