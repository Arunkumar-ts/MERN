import { Todo } from "../model/todo.model";
import { getTodo } from "../data-contracts/response/gettodo.response";
import { createTodo as createTodoInter, createTodoSchema } from "../data-contracts/request/createtodo.request";
import { ZodError } from 'zod';
import { getTodo as getTodoReq, getTodoSchema } from "../data-contracts/request/gettodo.request";
import { getTodosType } from "../types/gettodos.types";
import ReturnResponse from "../model/return-response";

export const getTodos = async (req:getTodoReq) =>{
    try {
        const parseResult = await getTodoSchema.safeParseAsync(req); 
        if (!parseResult.success) {
            return ReturnResponse.createFailure("Validation failed", parseResult.error.flatten());
        }
        const returnData = parseResult.data;
        const userId = returnData.userId;
        const skip = returnData.pageIndex * returnData.pageSize;
        const filter: any = { userId };
        if (returnData.searchString) {
        filter.title = { $regex: returnData.searchString, $options: "i" };
        }
        const [totalRows, todos] = await Promise.all([
            Todo.countDocuments(filter),
            Todo.find(filter)
            .skip(skip)
            .limit(returnData.pageSize)
            .sort({ dueDate: 1 }) 
            .lean()
        ]);
        const result:getTodosType = {
            totalRows,
            todos
        }
        return ReturnResponse.createSuccess('Data fetched successfully!', result);

    } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        return ReturnResponse.createFailure(err.message, { stack: err.stack });
    }
}

export const createTodo = async (req: createTodoInter) =>{   
    try {
        const parseResult = await createTodoSchema.safeParseAsync(req); 
        if (!parseResult.success) {
            return ReturnResponse.createFailure("Validation failed", parseResult.error.flatten());
        }
        const returnData = parseResult.data;
        const todo:getTodo = await Todo.create({...returnData});
        return ReturnResponse.createSuccess('Todo created successfully!', todo);

    } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        return ReturnResponse.createFailure(err.message, { stack: err.stack });
    }
}

export const updateTodo = async (id:string) =>{
    try {
        const todo:getTodo | null = await Todo.findOneAndUpdate(
            { _id: id },
            { $set: {isCompleted: true } },
            { new: true, runValidators: true }
        );
        return ReturnResponse.createSuccess('Todo updated successfully!', todo);
    } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        return ReturnResponse.createFailure(err.message, { stack: err.stack });
    }
}

export const deleteTodo = async (id:string) =>{
    try {
        const todo = await Todo.findByIdAndDelete(id);
        return ReturnResponse.createSuccess('Todo deleted successfully!', todo);
    } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        return ReturnResponse.createFailure(err.message, { stack: err.stack });
    }
}