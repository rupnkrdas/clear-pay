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
				<div className="bg-gray-200 h-8 w-8 rounded-full flex justify-center text-[14px] items-center mr-2">
					{user.firstName.charAt(0)}
				</div>
				<div className="font-semibold text-[18px]">
					{user.firstName} {user.lastName}
				</div>
			</div>
			<div className="flex justify-center">
				<button
					className="bg-[#18181B] w-full rounded-md text-white px-5 py-2 text-[14px] hover:bg-gray-800"
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
