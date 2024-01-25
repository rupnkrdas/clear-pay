import { atom, selector } from "recoil";
import { BACKEND_URL } from "../../config/Backend";
import axios from "axios";

export const currentUserAtom = atom({
	key: "currentUser",
	default: selector({
		key: "currentUser/default",
		get: async () => {
			const res = await axios.get(`${BACKEND_URL}/user/`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			if (res.status === 200) return res.data;
		},
	}),
});

export const currentUserSelector = selector({
	key: "currentUserSelector",
	get: async () => {
		const res = await axios.get(`${BACKEND_URL}/user/`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		if (res.status === 200) {
			return res.data;
		}
	},
});
