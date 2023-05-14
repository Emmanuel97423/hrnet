import {Employee} from "../types/employee";
const STORAGE_KEY: string = 'employee';
const initialArray:Employee[] = [];

localStorage.setItem(STORAGE_KEY, JSON.stringify(initialArray));



export const saveToStorage = ( employee: Employee) => {
let storedArray:Employee[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    if(storedArray){
        storedArray.push(employee);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedArray));
    };

}