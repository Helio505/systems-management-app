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
