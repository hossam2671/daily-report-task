import { z } from "zod";

export const TaskSchema = z.object({
  description: z.string().min(1, "required"),
  fromTime: z.date(),
  toTime: z.date(),
});


export const UpdateTaskSchema = z.object({
  description: z.string().min(1, "required"),
  fromTime: z.any().optional(),
  toTime: z.any().optional(),
});