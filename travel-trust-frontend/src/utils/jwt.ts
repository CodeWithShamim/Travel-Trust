export const decodeJWT = (token: string) => {
  const parts = token?.split(".");
  if (parts?.length !== 3) {
    // throw new Error("Invalid JWT format");
    return "";
  }

  const payloadBase64 = parts[1];
  const decodedPayload = atob(payloadBase64);
  return JSON.parse(decodedPayload);
};
