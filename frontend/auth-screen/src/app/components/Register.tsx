"use client";
import React from "react";
import { InputComponent } from "./InputComponent";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services/api";

const schema = z
	.object({
		username: z.string().min(1, { message: "Username necessary" }),
		email: z.string().email({ message: "Invalid email" }),
		password: z.string().min(1, { message: "Password is necessary" }),
		confirmPassword: z.string(),
	})
	//TODO: oque o refine faz?
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords does not match",
	});

type Schema = z.TypeOf<typeof schema>;

export default function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(dataForm: Schema) {
		const { username, email, password } = dataForm;

		const data = {
			name: username,
			email,
			password
		}
		const response = await api.post("/create", data)
		console.log(response.data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-4">
				<InputComponent
					{...register("username")}
					title="username"
					type="text"
					placeholder="Your username"
					labelText="Username"
					error={!!errors.username?.message}
				/>
				<span className="text-red-600">{errors.username?.message}</span>
				<InputComponent
					{...register("email")}
					title="email"
					type="email"
					placeholder="email"
					labelText="Email"
					error={!!errors.email?.message}
				/>
				<span className="text-red-600">{errors.email?.message}</span>
				<InputComponent
					{...register("password")}
					title="password"
					type="password"
					placeholder="Your password"
					labelText="Password"
					error={!!errors.password?.message}
				/>
				<span className="text-red-600">{errors.password?.message}</span>
				<InputComponent
					{...register("confirmPassword")}
					title="confirmPassword"
					type="password"
					placeholder="Confirm password"
					labelText="Confirm password"
					error={!!errors.confirmPassword?.message}
				/>
				<span className="text-red-600">{errors.confirmPassword?.message}</span>
			</div>
			<button
				type="submit"
				className="mt-4 transition-colors bg-purple-600 text-white p-2 w-full rounded-md hover:bg-purple-900"
			>
				Register
			</button>
		</form>
	);
}
