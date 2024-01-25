import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { recipientUserAtom } from "../store/atoms/recipientUser";
import axios from "axios";
import { transferAmountAtom } from "../store/atoms/transferAmount";
import { BACKEND_URL } from "../config/backendUrl";

const SendMoneyModalCard = ({ onClose, reloadDashboard }) => {
	const [recipientUser, setRecipientUser] = useRecoilState(recipientUserAtom);

	const [transferAmount, setTransferAmount] =
		useRecoilState(transferAmountAtom);

	const handleOnClose = () => {
		reloadDashboard();
		onClose();
	};

	const handleOnChange = (e) => {
		e.preventDefault();
		setTransferAmount(e.target.value);
	};

	const handleInitiateTransfer = async () => {
		try {
			const postBody = {
				transferAmount,
				toUserId: recipientUser._id,
			};
			const res = await axios.post(
				`${BACKEND_URL}/account/transfer`,
				postBody,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
						"Content-Type": "application/json",
					},
				}
			);

			alert(`${res.data.message}`);
			setTransferAmount(0);
			handleOnClose();
		} catch (err) {
			// console.log(err);
			setTransferAmount(0);
			alert(`${err.response.data.message}`);
			handleOnClose();
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
			<div className="bg-white pb-6 pl-6 pr-6 pt-3 rounded-md shadow-md flex flex-col w-[180px]">
				<button className="w-5 h-6 self-end" onClick={handleOnClose}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						strokeWidth="1"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18 18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<div className="font-bold mb-6 text-center">Send Money</div>
				<div className="flex items-center">
					<div className="bg-[#21C55D] h-5 w-5 rounded-full mr-2 flex justify-center text-[12px] items-center text-white">
						{recipientUser.firstName.charAt(0)}
					</div>
					<div className="font-semibold text-[14px]">
						{recipientUser.firstName}
					</div>
				</div>
				<div className="text-[8px] font-semibold">Amount (in Rs)</div>
				<input
					className="my-1 border rounded-md  placeholder:text-[8px] text-[8px] p-1 focus:outline-none"
					placeholder="Enter Amount"
					onChange={handleOnChange}
					value={!transferAmount ? "" : transferAmount}
				/>
				<button
					className="bg-[#21C55D] text-white text-[10px] rounded-md py-1 hover:bg-green-600"
					onClick={handleInitiateTransfer}
				>
					Initiate Transfer
				</button>
			</div>
		</div>
	);
};

export default SendMoneyModalCard;
