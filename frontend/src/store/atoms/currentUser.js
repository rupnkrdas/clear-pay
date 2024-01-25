import { atom, selector } from "recoil";
import axios from "axios";
import { BACKEND_URL } from '../../config/backendUrl';


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
