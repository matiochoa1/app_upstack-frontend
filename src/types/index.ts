import { z } from "zod";

// Projects

export const projectSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	projectDescription: z.string(),
});

export const dashboardProjectSchema = z.array(
	projectSchema.pick({
		_id: true,
		projectName: true,
		clientName: true,
		projectDescription: true,
	})
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
	Project,
	"clientName" | "projectDescription" | "projectName"
>;

// Task Schema

export const taskStatusSchema = z.enum([
	"PENDING",
	"ON_HOLD",
	"IN_PROGRESS",
	"UNDER_REVIEW",
	"COMPLETED",
]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
	_id: z.string(),
	taskName: z.string(),
	description: z.string(),
	project: z.string(),
	status: taskStatusSchema,
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "taskName" | "description">;
