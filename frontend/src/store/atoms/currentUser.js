import { atom } from "recoil";

export const currentUserAtom = atom({
	key: "currentUser",
	// default: {
	// 	_id: Math.random(),
	// 	firstName: "First Name",
	// 	lastName: "Last Name",
	// 	username: "firstlast@gmail.com",
	// },
	default: {},
});
