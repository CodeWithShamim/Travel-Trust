import { config } from "@/helpers/config/envConfig";
import { message } from "antd";
import axios from "axios";
import { removeValueFromLocalStorage } from "./local-storage";
import { authKey } from "@/constants/storageKey";
import { removeUserData } from "@/redux/slices/userSlice";

export const getTimeAndDate = () => {
  const currentDate = new Date();

  // Extract date components
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const amOrPm = Number(hours) < 12 ? "AM" : "PM";
  const formattedHours = (Number(hours) % 12 || 12).toString();

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${formattedHours}:${minutes} ${amOrPm}`;

  const result = {
    date: formattedDate,
    time: formattedTime,
  };

  return result;
};

export const timeAgo = (timestamp: string) => {
  const now = new Date();
  const pastDate = new Date(timestamp);
  const timeDifference = Number(now) - Number(pastDate);

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else {
    return `${minutes} minutes ago`;
  }
};

export const getCoordinates = async (location: string) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
      {
        params: {
          access_token: config.mapbox_token,
          limit: 1,
        },
      }
    );

    const features = response.data.features;
    if (features.length > 0) {
      const { center } = features[0];
      const [longitude, latitude] = center;
      return { latitude, longitude };
    } else {
      message.error(`No coordinates found for ${location}`);
      return null;
    }
  } catch (error: any) {
    console.error(
      `Error fetching coordinates for ${location}: ${error.message}`
    );
    return null;
  }
};

export const generateRandomHexColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

export const calculateAverateRating = (ratings: number[]) => {
  const sumOfRatings = ratings.reduce((acc, rating) => acc + rating, 0);

  const averageRating = sumOfRatings / ratings.length;

  return averageRating;
};

export const SignOut = ({ router, dispatch }: any) => {
  removeValueFromLocalStorage(authKey);
  dispatch(removeUserData());
  router.push("/login");
};



