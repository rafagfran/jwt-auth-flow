"use client"
import { api } from "@/services/api";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
	user: "",
	signed: false,
	signin: async ({ email, password }: { email: string; password: string }) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState("");

	useEffect(() => {
		const loadStoragedData = async () => {
			const storageUser = localStorage.getItem("@Auth:user");
			const storageToken = localStorage.getItem("@Auth:token");

			if (storageUser && storageToken) {
				setUser(storageUser);
			}
		};

		loadStoragedData()
	}, []);

	const signin = async ({
		email,
		password,
	}: { email: string; password: string }) => {
		const response = await api.post("/auth", { email, password });

		if (response.data.error) {
			alert(response.data.error);
		} else {
			setUser(response.data.user);
			api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

			localStorage.setItem("@Auth:token", response.data.token);
			localStorage.setItem("@Auth:user", response.data.user);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				signed: !!user,
				signin,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
