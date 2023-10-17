import { authKey } from "@/constants/storageKey";
import { decodeJWT } from "@/utils/jwt";
import { getTokenFromLocalStorage } from "@/utils/local-storage";

export const getUserInfo = () => {
  const token = getTokenFromLocalStorage(authKey);
  const user = decodeJWT(token as string);
  return user;
};
