import { User } from '../model/user.model';
import { getUser } from '../data-contracts/response/getuser.response';
import { createUser as createUserInter, createUserSchema } from '../data-contracts/request/createuser.request';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ReturnResponse from '../model/return-response';
import { loginUser as loginUserInter, loginSchema } from '../data-contracts/request/login.request';

export const createUser = async (req:createUserInter): Promise<ReturnResponse> =>{
    try {
        const parseResult = await createUserSchema.safeParseAsync(req); 
        if (!parseResult.success) {
            return ReturnResponse.createFailure("Validation failed", parseResult.error.flatten());
        }
        const returnData = parseResult.data;
        const existingUser = await User.findOne({ email: returnData.email });
        if (existingUser) {
            return ReturnResponse.createFailure("Email already registered");
        }
        const hashedPassword = await bcrypt.hash(returnData.password, 10);
        const user:getUser = await User.create({...returnData, password:hashedPassword});
        return ReturnResponse.createSuccess('User created successfully!', user);
    } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        return ReturnResponse.createFailure(err.message, { stack: err.stack });
    }
}

export const login = async (req:loginUserInter) =>{
    try{
        const parseResult = await loginSchema.safeParseAsync(req); 
        if (!parseResult.success) {
            return ReturnResponse.createFailure("Validation failed", parseResult.error.flatten());
        }
        const returnData = parseResult.data;
        const user: getUser | null = await User.findOne({ email: returnData.email });
        if (!user){
            return ReturnResponse.createFailure("Invalid credentials Username or password!");
        }
        const match = await bcrypt.compare(returnData.password, user.password);
        if (!match){
            return ReturnResponse.createFailure("Invalid credentials Username or password!");
        }
        const token = jwt.sign({ id: user._id, email:user.email }, process.env.JWT_SECRET!, { expiresIn: '1d' });
        return ReturnResponse.createSuccess("Login successfully", {token, userId:user._id});
    } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        return ReturnResponse.createFailure(err.message, { stack: err.stack });
    }
}