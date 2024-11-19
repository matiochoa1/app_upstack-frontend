import { z } from "zod";

// Auth & users
export const authSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	password_confirmation: z.string(),
	token: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
	Auth,
	"name" | "email" | "password" | "password_confirmation"
>;
export type ConfirmToken = Pick<Auth, "token">;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;

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

// Users

export const userSchema = authSchema
	.pick({
		name: true,
		email: true,
	})
	.extend({
		_id: z.string(), // esto es para que se pueda agregar el id del usuario aparte de lo que viene del authSchema
	});

export type User = z.infer<typeof userSchema>;

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

/* Team */

export const teamMemberSchema = userSchema.pick({
	name: true,
	email: true,
	_id: true,
});

export const TeamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;
