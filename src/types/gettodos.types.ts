import { getTodo } from "../data-contracts/response/gettodo.response";

export interface getTodosType {
    totalRows:number;
    todos:getTodo[]
}