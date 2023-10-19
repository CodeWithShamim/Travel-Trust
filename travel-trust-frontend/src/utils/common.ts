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
