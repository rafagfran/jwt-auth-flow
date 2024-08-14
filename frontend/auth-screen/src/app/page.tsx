"use client";

import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

export default function Home() {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<main className="bg-slate-900 h-screen flex items-center justify-center border-2 ">
			<div className="w-full p-4">
				<div className="mx-auto bg-white shadow-xl shadow-black rounded-md p-8 max-w-md flex flex-col gap-4">
					<div className=" flex mx-auto shadow-inner w-fit p-1 rounded-full shadow-black/70 ring-1 ring-black/5 mb-4">
						<button
							type="button"
							disabled={isLogin}
							onClick={() => setIsLogin(true)}
							className={`${isLogin ? "bg-purple-600 text-white" : "bg-transparent text-gray-500"} py-2 px-4 rounded-full`}
						>
							SignIn
						</button>
						<button
							type="button"
							disabled={!isLogin}
							onClick={() => setIsLogin(false)}
							className={`${!isLogin ? "bg-purple-600 text-white" : "bg-transparent text-gray-500"} py-2 px-4 rounded-full`}
						>
							Register
						</button>
					</div>
					<h1 className="w-fit mx-auto  text-3xl font-semibold">{isLogin ? "Login" : "Register"}</h1>
					<div className="h-px bg-slate-300 rounded-full"/> 
					{isLogin ? <Login /> : <Register />}
				</div>
			</div>
		</main>
	);
}
