export default interface userModel{
    id:string;
    username: string;
    email: string;
    password?: string;
    role: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    city: string;
    country: string;
    pincode: number;
}