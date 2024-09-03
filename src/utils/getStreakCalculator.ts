export const getStreakCalculator = (dates) => {
  const toDateOnly = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const sortedDates = [
    ...new Set(dates.map((date) => toDateOnly(new Date(date)))),
  ].sort((a, b) => b - a);

  const today = toDateOnly(new Date());
  let streak = 0;

  for (let i = 0; i < sortedDates.length; i++) {
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);

    if (sortedDates[i].getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};
