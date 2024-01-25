import { atom, selector } from "recoil";
import axios from "axios";
import { BACKEND_URL } from "../../config/Backend";

export const currentUserBalanceAtom = atom({
	key: "currentUserBalance",
	default: selector({
		key: "currentUserBalance/default",
		get: async () => {
			const res = await axios.get(`${BACKEND_URL}/account/balance`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			return res.data.balance;
		},
	}),
});
