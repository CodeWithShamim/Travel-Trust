import { authKey } from "@/constants/storageKey";
import { decodeJWT } from "@/utils/jwt";
import { getValueFromLocalStorage } from "@/utils/local-storage";

export const getUserInfo = () => {
  const token = getValueFromLocalStorage(authKey);
  const user = decodeJWT(token as string);
  return user;
};
