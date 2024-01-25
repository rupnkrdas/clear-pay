function TextInput({
	labelText,
	labelFor,
	id,
	type,
	isRequired,
	placeholder,
	name,
	handleChange,
	value
}) {
	return (
		<div className="w-full">
			<label
				className="text-[9px] font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				htmlFor={labelFor}
				id={id}
			>
				{labelText}
			</label>

			<input
				className="flex w-full rounded-md border border-gray-300 bg-transparent px-2 py-1 text-[9px] placeholder:text-gray-500 placeholder:text-[8px] focus:outline-none focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
				type={type}
				placeholder={placeholder}
				required={isRequired}
				id={id}
				name={name}
				onChange={handleChange}
				value={value}
			></input>
			{id === "password" && (
				<div className="text-gray-500 text-[8px]">
					* min 6 characters
				</div>
			)}
		</div>
	);
}

export default TextInput;
