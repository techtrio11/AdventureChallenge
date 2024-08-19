export const getStreakCalculator = (datesArray) => {
  if (datesArray.length === 0) return 0;

  // Convert string dates to Date objects and sort in descending order
  const sortedDates = datesArray
    .map((obj) => new Date(obj.date))
    .sort((a, b) => b - a);

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const diffInTime = sortedDates[i - 1] - sortedDates[i];
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    if (diffInDays === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return maxStreak;
};
