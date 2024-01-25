import { atom } from "recoil";

export const currentUserBalanceAtom = atom({
	key: "currentUserBalance",
	default: 0,
});
