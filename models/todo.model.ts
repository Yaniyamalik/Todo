import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ITodo extends Document {
  text: string;
  completed: boolean;
}

const TodoSchema = new Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = models.Todo || model<ITodo>("Todo", TodoSchema);

export default Todo;
