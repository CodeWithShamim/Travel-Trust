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
