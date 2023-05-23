export type Employee = {
    firstname?: string;
    lastname?: string;
    birthday?: string;
    start?: string;
    department?: string;
    street?:string;
    city?:string;
    state?:string;
    stateCode?:string;
    zipcode?:string;
    pageIndex?:number;
    pageSize?:number;
}

export type EmployeesList = {
    columns: string[];
    employees: Employee[];
    pageIndex: number;
    pageSize: number;
}

export type EmployeesTableColumns = {
    Header: any;
    accessor: any;
}