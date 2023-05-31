import { createContext } from 'react';

interface Employee {
  firstname: string;
  lastname: string;
  birthday: string;
  start: string;
  street: string;
  city: string;
  state: string;
  zipcode: number;
  department: string;
}

const employees: Employee[] = [];
const AppContext = createContext({ employees });
