const signupFields = [
	{
		labelText: "First Name",
		labelFor: "first-name",
		id: "firstName",
		type: "text",
		isRequired: true,
		placeholder: "John",
		name: "firstName",
	},
	{
		labelText: "Last Name",
		labelFor: "last-name",
		id: "lastName",
		type: "text",
		isRequired: true,
		placeholder: "Doe",
		name: "lastName",
	},
	{
		labelText: "Email",
		labelFor: "email",
		id: "username",
		type: "email",
		isRequired: true,
		placeholder: "johndoe@gmail.com",
		name: "email",
	},
	{
		labelText: "Password",
		labelFor: "password",
		id: "password",
		type: "password",
		isRequired: true,
		name: "password",
	},
];

const signinFields = [
	{
		labelText: "Email",
		labelFor: "email",
		id: "username",
		type: "email",
		isRequired: true,
		placeholder: "johndoe@gmail.com",
		name: "email",
	},
	{
		labelText: "Password",
		labelFor: "password",
		id: "password",
		type: "password",
		isRequired: true,
		name: "password",
		// placeholder: "Password (min. 6 characters)",
	},
];

export { signupFields, signinFields };
