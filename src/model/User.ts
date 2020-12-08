


export class User {

    constructor(
        private id:string,
        private name:string,
        private email:string,
        private password:string,
        private role:UserRole
    ){}

    public getId = ():string => this.id
    public getName = ():string => this.name
    public getEmail = ():string => this.email
    public getPassword = ():string => this.password
    public getRole = ():UserRole => this.role

}


export interface UserInputDTO{
    email: string;
    password: string;
    name: string;
    role: UserRole;
}

export interface LoginInputDTO{
    email: string;
    password: string;
}

export enum UserRole{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}