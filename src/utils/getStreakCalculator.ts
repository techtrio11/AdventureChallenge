export const getStreakCalculator = (dates) => {
  const sortedDates = [
    ...new Set(dates.map((date) => toDateOnly(new Date(date)))),
  ].sort((a, b) => b - a);

  const uniqueSortedDates = removeDuplicates(sortedDates);
  const today = toDateOnly(new Date());
  let streak = 0;

  for (let i = 0; i < uniqueSortedDates.length; i++) {
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);

    if (uniqueSortedDates[i].getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

const toDateOnly = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

function removeDuplicates(array) {
  return [...new Set(array)];
}
