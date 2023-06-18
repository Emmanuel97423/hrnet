// Importing necessary dependencies and types
import { createContext, useReducer } from 'react';
import { ReactNode } from 'react';
import type { Employee } from '@/types/employee';

/**
 * FormContextProps interface.
 * Defines the shape of the context provided to the components wrapped inside FormProvider.
 */
interface FormContextProps {
  employees: Employee[];
  addEmployee?: (employee: Employee) => void;
  initialState?: Employee[];
}

/**
 * Action type.
 * Defines the shape of the actions which can be dispatched to the reducer.
 */
type Action = { type: 'ADD_EMPLOYEE'; payload: Employee };

/**
 * State type.
 * Defines the shape of the state managed by the reducer.
 */
type State = {
  employees: Employee[];
};

// Retrieving the employees data from local storage
const employees = localStorage.getItem('employees');
const storage: Employee[] = employees ? JSON.parse(employees) : [];

let initialState: FormContextProps;

// Check if there are employees in the local storage
if (storage) {
  initialState = {
    employees: storage
  };
} else {
  initialState = {
    employees: []
  };
}

/**
 * Reducer function for handling state changes.
 *
 * @param {State} state - The current state
 * @param {Action} action - The dispatched action
 */
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

// Creating the FormContext with default values
export const FormContext = createContext<FormContextProps>(initialState);

/**
 * FormProvider component.
 * Provides the FormContext to the components wrapped inside it.
 *
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The children components
 */
export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Function to dispatch ADD_EMPLOYEE action
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
