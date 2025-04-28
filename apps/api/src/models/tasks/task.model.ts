import { Schema, model, Document } from "mongoose";

const taskSchema = new Schema<Task>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const TaskModel = model<Task>("Task", taskSchema);

export interface Task extends Document {
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
}
