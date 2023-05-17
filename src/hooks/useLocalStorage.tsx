import { useEffect, useState } from 'react';
import type { Employee } from '@/types/employee';

const useLocalStorage = (): [
  Employee[],
  (employee: Employee) => void,
  (storageKey: string) => void
] => {
  const [storedValue, setStoredValue] = useState<Employee[]>([]);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem('employees') || '[]');
    setStoredValue(arr);
  }, []);

  const saveEmployee = (employee: Employee) => {
    const updatedEmployees = [...storedValue, employee];
    setStoredValue(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const deleteEmployee = (firstname: string) => {
    const updatedEmployees = storedValue.filter(
      (employee) => employee.firstname !== firstname
    );
    setStoredValue(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return [storedValue, saveEmployee, deleteEmployee];
};

export default useLocalStorage;
