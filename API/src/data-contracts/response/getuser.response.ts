export interface getUser {
    _id:any;
    name: string;
    email: string;
    password: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v:number;
}