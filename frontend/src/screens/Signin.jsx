import { useState } from "react";
import { signinFields } from "../constants/formFields";
import TextInput from "../components/TextInput";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { BACKEND_URL } from "../config/backendUrl";

const fields = signinFields;
let initialSigninState = {};
fields.map((field) => (initialSigninState[field.id] = ""));

const SigninPage = () => {
	const navigate = useNavigate();
	const [signinState, setSigninState] = useState(initialSigninState);

	const handleChange = (e) =>
		setSigninState({ ...signinState, [e.target.id]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleSigninUser();
	};

	const handleSigninUser = async () => {
		try {
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/user/signin`,
				{
					username: signinState.username,
					password: signinState.password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			localStorage.setItem("token", res.data.token);
			navigate("/");
		} catch (err) {
			console.log(err);
			alert(`${err.response.data.message}`);
		}
	};
	return (
		<div className="bg-[#7F7F7F] flex justify-center items-start h-screen p-2">
			<div className="card-container shadow-lg rounded-lg flex flex-col p-4 items-center bg-[#FFFFFF] mt-14 w-[300px]">
				<div className="font-bold text-[28px] mb-1">Sign In</div>
				<div className="text-[14px] text-center text-gray-500 mb-6">
					Enter your credentials to access your account
				</div>
				{signinFields.map((field) => (
					<TextInput
						labelText={field.labelText}
						placeholder={field.placeholder}
						id={field.id}
						labelFor={field.labelFor}
						type={field.type}
						isRequired={field.isRequired}
						key={field.id}
						name={field.name}
						handleChange={handleChange}
					/>
				))}

				<div className="w-full">
					<SubmitButton
						title={"Sign In"}
						handleSubmit={handleSubmit}
					/>
				</div>
				<div className="flex text-[12px] mt-1 ">
					<div>Don't have an account?</div>
					<button
						className="mx-1 underline font-semibold text-[12px]"
						onClick={() => navigate("/signup")}
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
};

export default SigninPage;
