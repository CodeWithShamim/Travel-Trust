export const setValueToLocalStorage = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

export const getValueFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export const removeValueFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.removeItem(key);
};
