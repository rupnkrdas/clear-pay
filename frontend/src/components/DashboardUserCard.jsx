import { useRecoilState, useSetRecoilState } from "recoil";
import { recipientUserAtom } from "../store/atoms/recipientUser";

const DashboardUserCard = ({ user, showModal }) => {
	const [recipientUser, setRecipientUser] = useRecoilState(recipientUserAtom);

	const handleShowModalPopup = () => {
		setRecipientUser(user);
		showModal();
	};

	return (
		<div className="flex justify-between items-center py-1">
			<div className="flex justify-center items-center">
				<div className="bg-gray-200 h-5 w-5 rounded-full flex justify-center text-[10px] items-center mr-1">
					{user.firstName.charAt(0)}
				</div>
				<div className="font-semibold text-[10px]">{user.firstName}</div>
			</div>
			<div className="flex justify-center">
				<button
					className="bg-[#18181B] w-full rounded-md text-white px-3 py-1 text-[8px]  hover:bg-gray-800"
					onClick={() => {
						handleShowModalPopup();
					}}
				>
					Send Money
				</button>
			</div>
		</div>
	);
};

export default DashboardUserCard;
