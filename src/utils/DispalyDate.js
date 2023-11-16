const convertSecondsToHumanDate = (seconds) => {
  const milliseconds = seconds * 1000;
  const dateObject = new Date(milliseconds);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const month = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};

export default convertSecondsToHumanDate;
