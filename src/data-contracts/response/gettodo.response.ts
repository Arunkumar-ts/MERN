export interface getTodo {
    _id:any;
    title: string;
    description?: string;
    isCompleted: boolean;
    dueDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    __v:number;
}