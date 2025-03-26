const formatTime = (dateString) => {
  const dateObj = new Date(dateString);

  // Format time in 12-hour format
  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12-hour format

  return ` ${hours}:${minutes} ${ampm}`;
};

export default formatTime;
