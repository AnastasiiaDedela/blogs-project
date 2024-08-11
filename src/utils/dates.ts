export const formatDate = (date: string) => {
  const formatedDate = new Date(date);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = monthNames[formatedDate.getMonth()];
  const day = formatedDate.getDate();
  const year = formatedDate.getFullYear();

  return `${month} ${day}, ${year}`;
};
