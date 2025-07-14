import { User } from '../model/user.model';
import { getUser } from '../data-contracts/response/getuser.response';
import mongoose from 'mongoose';
import { createUser as createUserInter, createUserSchema } from '../data-contracts/request/createuser.request';
import bcrypt from 'bcryptjs';
import ReturnResponse from '../model/return-response';

export const getUserById = async (id:string): Promise<ReturnResponse> =>{
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return ReturnResponse.createFailure("Invalid user ID format");
    }
    const user:getUser | null = await User.findById(id);
    if (!user){
        return ReturnResponse.createFailure("User not found");
    }
    return ReturnResponse.createSuccess("Data fetched successfully!", {name:user.name, email:user.email});
}

export const updateUser = async (id:string, req:createUserInter): Promise<ReturnResponse> =>{
    try{
        const parseResult = await createUserSchema.safeParseAsync(req); 
        if (!parseResult.success) {
            return ReturnResponse.createFailure("Validation failed", parseResult.error.flatten());
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return ReturnResponse.createFailure("Invalid user ID format");
        }
        const returnData = parseResult.data
        const existingUser = await User.findOne({ email: returnData.email });
        const result = await getUserById(id);
                
        if (existingUser?.email !== result.data.email  ) {
            return ReturnResponse.createFailure("Email already registered!");
        }
        const hashedPassword = await bcrypt.hash(returnData.password, 10);

        const user:getUser | null = await User.findByIdAndUpdate(
        {_id:id},
        { $set: { ...returnData, password:hashedPassword } },
        { new: true, runValidators: true }
        );
        if (!user){
             return ReturnResponse.createFailure("User not found");
        }
        return ReturnResponse.createSuccess("User updated successfully", {name:user.name, email:user.email});
    } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        return ReturnResponse.createFailure(err.message, { stack: err.stack });
    }
}

export const deleteUser = async (id:string) =>{
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return ReturnResponse.createFailure("Invalid user ID format");
        }
        const user: getUser | null = await User.findByIdAndDelete(id);
        if (!user){
             return ReturnResponse.createFailure("User not found");
        }
        return ReturnResponse.createSuccess("User deleted successfully!", {name:user.name, email:user.email});
    } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        return ReturnResponse.createFailure(err.message, { stack: err.stack });
    }
}
