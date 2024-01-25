import { atom, selector } from 'recoil';
import axios from 'axios';
import { BACKEND_URL } from '../../config/Backend';

export const dbUsersAtom = atom({
  key: "dbUsers",
  default: selector({
    key: "dbUsers/default",
    get: async () => {
      const res = axios.get(`${BACKEND_URL}/user/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })

      return (await res).data.users;
    }
  })
})