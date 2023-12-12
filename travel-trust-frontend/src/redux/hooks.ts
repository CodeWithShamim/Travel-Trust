import { AppDispatch, RootState } from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { backendURL } from "@/constants/url";
import { dynamicBlurDataUrl } from "@/utils/base64";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface IDebounced {
  searchQuery: string;
  delay: number;
}

export const useDebounced = ({ searchQuery, delay }: IDebounced) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchQuery, delay]);

  return debouncedValue;
};

export const useSocket = () => {
  const [socket, setSocket] = useState<any>();

  useEffect((): any => {
    const newSocket = io(backendURL?.split("/api")[0]);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return socket;
};

export const useBlurDataURL = (image: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blurDataURL, setBlurDataURL] = useState<string>("");

  useEffect(() => {
    const getBlurDataURL = async () => {
      setIsLoading(true);
      const res = await dynamicBlurDataUrl(image);
      setBlurDataURL(res);
      setIsLoading(false);
    };

    image && getBlurDataURL();
  }, [image]);

  return { blurDataURL, isLoading };
};
