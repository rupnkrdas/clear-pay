import { atom } from "recoil";

export const recipientUserAtom = atom({
	key: "recipientUser",
	default: {
		_id: Math.random(),
		firstName: "Guest First Name",
		lastName: "Guest Last Name",
		username: "Guest username",
		balance: 0,
	},
});
