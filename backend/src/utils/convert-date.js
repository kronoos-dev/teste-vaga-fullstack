export function convertDate(dateString) {
  if (typeof dateString !== "string" || dateString.length !== 8) {
    throw new Error("Invalid date string");
  }

  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  const formattedDate = new Date(`${year}-${month}-${day}`);

  return formattedDate;
}
