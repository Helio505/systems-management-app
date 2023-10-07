/**
 * Convert date to pt-BR format
 * @param date - Date to be converted
 * @example convertDate("2021-09-01T00:00:00.000Z")
 */
const convertDate = (date: string | undefined) => {
  if (!date) return null;
  const newDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return newDate;
};

export default convertDate;
