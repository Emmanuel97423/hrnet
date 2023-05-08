export type FormProps = {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    startDate?: string;
    email?: string;
    adress?:Adress;
    department?:string;

}
export type Adress = {
    street?: string;
    city?: string;
    zipCode?: string;
    state?: string;
}