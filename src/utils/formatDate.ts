export const formatFirebaseDate = (firebaseDate: any) => {
  let date = "";
  if (firebaseDate) {
    const dateObject = new Date(firebaseDate.toDate());
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(dateObject.getDate()).padStart(2, "0");
    date = `${month}/${day}/${year}`;
  }
  return date;
};

export const formatDate = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};
