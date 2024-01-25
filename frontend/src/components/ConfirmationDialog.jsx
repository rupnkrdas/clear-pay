const  ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-4 rounded-md shadow-sm text-[12px]">
				<p className="mb-4">{message}</p>
				<div className="flex justify-end text-[10px]">
					<button
						className="bg-rose-700 text-white px-4 py-1 rounded-md mr-2 focus:outline-none hover:bg-gray-500"
						onClick={onConfirm}
					>
						Confirm
					</button>
					<button
						className="bg-gray-300 text-black px-4 py-1 rounded-md focus:outline-none"
						onClick={onCancel}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationDialog