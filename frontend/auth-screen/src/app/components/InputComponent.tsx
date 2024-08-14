import { forwardRef } from "react";
import type { HTMLInputTypeAttribute } from "react";

interface InputComponentProps {
	title: string;
	labelText: string;
	placeholder: string;
	type: HTMLInputTypeAttribute;
	error?: boolean
}

export const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
	({ title, labelText, placeholder, type, error = false, ...props }, ref) => (
		<div className="flex flex-col gap-1">
			<label htmlFor={title}>{labelText}</label>
			<input
				{...props}
				type={type}
				id={title}
				placeholder={placeholder}
				className={`border border-purple-900/40 rounded-md p-2 focus:ring-2 ring-green-500 ring-offset-2 
				${error ? "ring-red-500 border-red-600" : "ring-green-500"}`}
				ref={ref}
			/>
		</div>
	),
);

InputComponent.displayName = "InputComponent";
