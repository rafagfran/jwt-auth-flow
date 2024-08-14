"use client";

import React, { useContext } from "react";
import { InputComponent } from "./InputComponent";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";

const schema = z.object({
	username: z.string().min(1, { message: "Username is necessary" }),
	password: z.string().min(1, { message: "Password is necessary" }),
});

type Schema = z.TypeOf<typeof schema>;

export default function Login() {
	const router = useRouter();
	const { signin, signed } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	async function onSubmit(dataForm: Schema) {
		const { username, password } = dataForm;

		const data = {
			email: username,
			password,
		};
		await signin(data);
	}

	if (signed) {
		router.push("/home");
	} else {
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
						{...register("password")}
						title="password"
						type="password"
						placeholder="Your password"
						labelText="Password"
						error={!!errors.password?.message}
					/>
					<span className="text-red-600">{errors.password?.message}</span>
				</div>
				<button
					type="submit"
					className="mt-4 transition-colors bg-purple-600 text-white p-2 w-full rounded-md hover:bg-purple-900"
				>
					Login
				</button>
			</form>
		);
	}
}
