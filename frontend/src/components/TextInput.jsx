function TextInput({
	labelText,
	labelFor,
	id,
	type,
	isRequired,
	placeholder,
	name,
	handleChange,
	value,
}) {
	return (
		<div className="w-full mb-3">
			<div className='mb-1'>
				<label
					className="text-[14px] font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					htmlFor={labelFor}
					id={id}
				>
					{labelText}
				</label>
			</div>

			<input
				className="flex w-full rounded-lg border border-gray-300 bg-transparent p-2 text-[14px] placeholder:text-gray-500 placeholder:text-[12px] focus:outline-none focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
				type={type}
				placeholder={placeholder}
				required={isRequired}
				id={id}
				name={name}
				onChange={handleChange}
				value={value}
			></input>
			{id === "password" && (
				<div className="text-gray-500 text-[12px]">
					* min 6 characters
				</div>
			)}
		</div>
	);
}

export default TextInput;
