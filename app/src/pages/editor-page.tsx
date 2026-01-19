import { Puck } from "@measured/puck";
import type { Config } from "@measured/puck";
import "@measured/puck/puck.css";
import { useState } from "react";

type Components = {
	DynamicInput: {
		label: string;
	};
	Example: {
		title: string;
	};
	Input: {
		field: string;
		label: string;
	};
};

interface UniversalInputProps {
	field: string; // key in the product data
	label?: string;
	value: any;
	onChange: (key: string, value: any) => void;
}

export const UniversalInput: React.FC<UniversalInputProps> = ({
	field,
	label,
	value,
	onChange,
}) => (
	<div className="p-3 mb-3 border rounded">
		<label className="block font-semibold mb-1">{label || field}</label>
		<input
			className="border rounded p-2 w-full"
			value={value || ""}
			onChange={(e) => onChange(field, e.target.value)}
			placeholder={`Enter ${label || field}`}
		/>
	</div>
);

const DynamicInput = ({ label }: { label: string }) => {
	const [value, setValue] = useState("");
	return (
		<div className="p-3 border rounded mb-3">
			<label className="block font-semibold mb-1">{label}</label>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={`Enter ${label?.toLowerCase()}`}
				className="border p-2 w-full rounded"
			/>
			<p className="text-sm text-gray-500 mt-1">Current: {value}</p>
		</div>
	);
};

export const config: Config<Components> = {
	components: {
		DynamicInput: {
			label: "Dynamic Input",
			fields: {
				label: { type: "text", label: "Label" },
			},
			render: ({ label }) => <DynamicInput label={label} />,
		},
		Example: {
			fields: {
				title: {
					type: "custom",
					render: ({ name, onChange, value }) => (
						<input
							defaultValue={value}
							name={name}
							onChange={(e) => onChange(e.currentTarget.value)}
							style={{ border: "1px solid black", padding: 4 }}
						/>
					),
				},
			},
			render: ({ title }) => {
				return <p>{title}</p>;
			},
		},
		Input: {
			label: "Universal Input",
			fields: {
				field: {
					type: "text",
					label: "Field name (e.g. name, price, sku)",
				},
				label: { type: "text", label: "Label (optional)" },
			},
			render: ({ field, label }, context) => {
				// Pull shared data + setter from context
				const { productData, setProductData } = context as any;

				const handleChange = (key: string, val: any) =>
					setProductData((prev: any) => ({ ...prev, [key]: val }));

				return (
					<UniversalInput
						field={field}
						label={label}
						value={productData?.[field]}
						onChange={handleChange}
					/>
				);
			},
		},
	},
};

// Describe the initial data
const initialData = {};

// Save the data to your database
const save = (data: any) => {
	localStorage.setItem("test_page", JSON.stringify(data));
};

// Render Puck editor
export function EditorPage() {
	return <Puck config={config} data={initialData} onPublish={save} />;
}
