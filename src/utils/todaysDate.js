const date = new Date();

// Define an array of month names
const monthNames = [
  "Jan", "Feb", "Mar",
  "Apr", "May", "Jun",
  "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec"
];

// Get the day, month, and year components from the date object
const day = date.getDate();
const monthIndex = date.getMonth();
const year = date.getFullYear();

// Format the date
const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

export default formattedDate;
