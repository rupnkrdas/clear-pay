const SubmitButton = ({ title, handleSubmit, type = "submit" }) => {
	return (
		<button
			className="bg-[#18181B] w-full rounded-md text-white p-1 text-[9px]  hover:bg-gray-800"
			onClick={handleSubmit}
			type={type}
		>
			{title}
		</button>
	);
};

export default SubmitButton;
