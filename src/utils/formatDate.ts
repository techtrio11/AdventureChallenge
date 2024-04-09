export const formatFirebaseDate = (firebaseDate: any) => {
  let date = "";
  if (firebaseDate) {
    const dateObject = new Date(firebaseDate.toDate());
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    date = `${month}/${day}/${year} ${hours}:${minutes}`;
  }
  return date;
};
