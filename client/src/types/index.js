export interface IUser {
    _id: string;
    email: string;
    fullName: string;
    phone: number;
}

export interface IPayLoad {
    email: string;
    fullName: string;
    phone: number;
}

export interface IOrder {
    _id: string;
    email: string;
    phone: number;
    fullName: string;
    amount: number;
    renew: any;
    isPaid: boolean;
    userId: string;
    teamId: string;
    product: string
}

export interface ITeam {
    _id: string;
    email: string;
    phone: number;
    members: IMember[];
    product: string;
    amount: number
}

export interface IMember {
    email: string;
    phone: number;
    fullName: string
}

export interface IErrors {
    [key: string]: string[];
}
