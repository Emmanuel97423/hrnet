import { createContext, useReducer, useState } from 'react';
// import useLocalStorage from '@/hooks/useLocalStorage';
import { ReactNode } from 'react';
import type { Employee } from '@/types/employee';

// Définition du type pour le contexte
interface FormContextProps {
  employees: Employee[];
  addEmployee?: (employee: Employee) => void;
  initialState?: Employee[];
}

const initialState = {
  employees: []
};

const appReducer = (state: any, action: any) => {
  console.log('action:', action);

  switch (action.type) {
    case 'ADD_EMPLOYEE': {
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    }
    default: {
      return state;
    }
  }
};

// Création du contexte avec une valeur initiale vide
export const FormContext = createContext<FormContextProps>(initialState);

// Création du provider pour le contexte
export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const addEmployee: (employee: Employee) => void | undefined = (
    employee: Employee
  ) => {
    console.log('employee:', employee);
    dispatch({
      type: 'ADD_EMPLOYEE',
      payload: employee
    });
  };

  return (
    <FormContext.Provider value={{ employees: state.employees, addEmployee }}>
      {children}
    </FormContext.Provider>
  );
};
