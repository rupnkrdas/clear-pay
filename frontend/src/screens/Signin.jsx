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
				`${BACKEND_URL}/user/signin`,
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
			<div className="card-container shadow-lg rounded-md w-[180px] flex flex-col p-2 items-center bg-[#FFFFFF] mt-24">
				<div className="font-bold">Sign In</div>
				<div className="text-[9px] text-center text-gray-500">
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
				<div className="flex text-[8px] mt-1 ">
					<div>Don't have an account?</div>
					<button
						className="mx-1 underline font-semibold"
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
