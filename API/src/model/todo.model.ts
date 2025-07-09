import { Schema, model, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate: Date;
  userId: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String},
    isCompleted: { type: Boolean, default: false},
    dueDate: {type: Date},
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Todo = model<ITodo>('Todo', todoSchema);
