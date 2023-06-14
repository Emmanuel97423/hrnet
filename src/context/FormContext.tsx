import { createContext, useReducer } from 'react';
// import useLocalStorage from '@/hooks/useLocalStorage';
import { ReactNode } from 'react';
import type { Employee } from '@/types/employee';

// Définition du type pour le contexte
interface FormContextProps {
  employees: Employee[];
  addEmployee?: (employee: Employee) => void;
  initialState?: Employee[];
}

type Action = { type: 'ADD_EMPLOYEE'; payload: Employee };
type State = {
  employees: Employee[];
};

const employees = localStorage.getItem('employees');
const storage: Employee[] = employees ? JSON.parse(employees) : [];

let initialState: FormContextProps;

if (storage) {
  initialState = {
    employees: storage
  };
} else {
  initialState = {
    employees: []
  };
}

const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEE': {
      const newEmployees: Employee[] = [...state.employees, action.payload];
      localStorage.setItem('employees', JSON.stringify(newEmployees));
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
