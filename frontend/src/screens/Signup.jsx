import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import TextInput from "../components/TextInput";
import axios from "axios";
import { signupFields } from "../constants/formFields";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/backendUrl";

const fields = signupFields;
const initialSignupState = {};
fields.forEach((field) => {
	initialSignupState[field.id] = "";
});

const SignupPage = () => {
	const navigate = useNavigate();
	const [signupState, setSignupState] = useState(initialSignupState);

	const handleSubmit = async (e) => {
		e.preventDefault();
		createAccount();
	};

	const handleChange = (e) =>
		setSignupState({ ...signupState, [e.target.id]: e.target.value });

	const createAccount = async () => {
		try {
			const postData = {
				firstName: signupState.firstName,
				lastName: signupState.lastName,
				username: signupState.username,
				password: signupState.password,
			};

			const res = await axios.post(
				`${BACKEND_URL}/user/signup`,
				postData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			localStorage.setItem("token", res.data.token);
			navigate("/");
		} catch (err) {
			alert(`${err.response.data.message}`);
		}
	};

	return (
		<div className="bg-[#7F7F7F] flex justify-center items-start h-screen p-2">
			<div className="card-container shadow-lg rounded-md w-[180px] flex flex-col p-2 items-center bg-[#FFFFFF] mt-24">
				<div className="font-bold">Sign Up</div>
				<div className="text-[9px] text-center text-gray-500">
					Enter your information to create an account
				</div>
				{signupFields.map((field) => (
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
						title={"Sign Up"}
						handleSubmit={handleSubmit}
					/>
				</div>
				<div className="flex text-[8px] mt-1 ">
					<div>Already have an account?</div>
					<button
						className="mx-1 underline font-semibold"
						onClick={() => navigate("/signin")}
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;
