import { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import DashboardUserCard from "../components/DashboardUserCard";
import SendMoneyModalCard from "../components/SendMoneyModalCard";
import {
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import axios from "axios";

import { BACKEND_URL } from "../config/Backend";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { currentUserAtom } from "../store/atoms/currentUser";
import { currentUserBalanceAtom } from "../store/atoms/currentUserBalance";
import { dbUsersAtom } from "../store/atoms/dbUsers";
import ConfirmationDialog from "../components/ConfirmationDialog";

const DashboardPage = () => {
	const navigate = useNavigate();

	const [reloadDashboard, setReloadDashboard] = useState(false);
	const handleReloadDashboard = () => {
		setReloadDashboard((prev) => !prev);
	};

	///
	const currentUser = useRecoilValue(currentUserAtom);
	const setCurrentUser = useSetRecoilState(currentUserAtom);
	const currentUserBalance = useRecoilValue(currentUserBalanceAtom);
	const setCurrentUserBalance = useSetRecoilState(currentUserBalanceAtom);
	const dbUsers = useRecoilValue(dbUsersAtom);
	const setDbUsers = useSetRecoilState(dbUsersAtom);
	///

	const [showLoading, setShowLoading] = useState(false);

	const [showModal, setShowModal] = useState(false);
	const [filter, setFilter] = useState(null);
	const [showSignoutDialog, setShowSignoutDialog] = useState(false);

	const handleShowSendMoneyPopup = () => {
		setShowModal(true);
	};
	const handleCloseSendMoneyPopup = () => {
		setShowModal(false);
	};

	const handleShowSignoutDialog = () => {
		setShowSignoutDialog(true);
	};

	const handleSignout = () => {
		localStorage.removeItem("token");
		// useResetRecoilState(currentUser);
		navigate("/signin");
	};

	const onChange = (e) => {
		e.preventDefault();
		setFilter(e.target.value);
	};

	const fetchUser = async () => {
		try {
			const res = await axios.get(`${BACKEND_URL}/user`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			if (res.status === 200) {
				setCurrentUser(res.data);
			} else {
				alert(`${res.data.message}`);
				navigate("/signin");
			}
		} catch (err) {
			alert(`${err}`);
		}
	};
	const fetchUserBalance = async () => {
		try {
			const res = await axios.get(`${BACKEND_URL}/account/balance`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			if (res.status === 200) {
				setCurrentUserBalance(res.data.balance);
			} else {
				alert(`${res.data.message}`);
				navigate("/signin");
			}
		} catch (err) {
			alert(`${err}`);
		}
	};
	const fetchDbUsers = async () => {
		try {
			const res = await axios.get(`${BACKEND_URL}/user/bulk`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			setDbUsers(res.data.users);
		} catch (err) {
			alert(`${err}`);
		}
	};

	const fetchData = async () => {
		await Promise.all([fetchUser(), fetchUserBalance(), fetchDbUsers()]);
		setShowLoading(false);
	};

	useEffect(() => {
		setShowLoading(true);
		fetchData();
	}, [reloadDashboard]);

	return (
		<div>
			{showLoading ? (
				<LoadingSpinner />
			) : (
				<div>
					{/** Navbar */}
					<div className="sticky w-full flex justify-between px-2 py-2 border-b-[1px]">
						<div className="font-semibold text-sm">
							Payments App
						</div>
						<div className="flex">
							<div className="text-sm">
								Hello, <span className='font-semibold'>{currentUser.firstName}!</span>
							</div>
							<div className="bg-gray-200 h-5 w-5 rounded-full mx-2 flex justify-center text-[10px] items-center font-semibold">
								{currentUser.firstName.charAt(0)}
							</div>
							<button
								className="flex justify-center items-center h-5 w-5 text-red-500"
								onClick={handleShowSignoutDialog}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
									/>
								</svg>
							</button>
						</div>
					</div>

					{/** Balance */}
					<div className="flex items-baseline">
						<div className="px-2 text-[12px] font-semibold my-2">
							Your balance
						</div>
						<div className="text-[12px] font-semibold">
							${currentUserBalance}
						</div>
					</div>

					{/** Search for Users */}
					<div className="px-2 text-[13px] font-semibold mb-1">
						Users
					</div>
					<div className="px-2 mb-2">
						<TextInput
							placeholder={"Search users..."}
							id={"searchUsers"}
							name={"search-users"}
							handleChange={onChange}
							value={filter}
						/>
					</div>

					{/** Users in Database */}
					<div className="px-2">
						{dbUsers.map((dbUser) => {
							if (!filter && dbUser._id !== currentUser._id) {
								return (
									<DashboardUserCard
										key={dbUser._id}
										user={dbUser}
										showModal={handleShowSendMoneyPopup}
									/>
								);
							}
							if (
								filter &&
								dbUser.firstName
									.toLowerCase()
									.includes(filter.toLowerCase())
							) {
								return (
									<DashboardUserCard
										key={dbUser._id}
										user={dbUser}
										showModal={handleShowSendMoneyPopup}
									/>
								);
							}
						})}
					</div>

					{/** Send Money Modal */}
					{showModal && (
						<SendMoneyModalCard
							onClose={handleCloseSendMoneyPopup}
							reloadDashboard={handleReloadDashboard}
						/>
					)}

					{showSignoutDialog && (
						<ConfirmationDialog
							message="Are you sure you want to sign out?"
							onConfirm={() => {
								handleSignout();
							}}
							onCancel={() => setShowSignoutDialog(false)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default DashboardPage;
