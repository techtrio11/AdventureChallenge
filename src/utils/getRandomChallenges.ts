import { ChallengesData } from "../types";

export const getRandomChallenges = (
  challengeData: ChallengesData[],
  excludeChallenges: ChallengesData[] = [],
  maxChallenges: number = 2
): ChallengesData[] => {
  let availableChallenges = challengeData;
  // //if there are more then 3 challenges then filter out the challenges already offered to the user
  if (challengeData.length > 3) {
    availableChallenges = challengeData.filter(
      (challenge) =>
        !excludeChallenges.some((excluded) => excluded.id === challenge.id)
    );
  }

  const randomChallenges = [];
  const maxAttempts = Math.min(maxChallenges, availableChallenges.length);

  // Select unique random challenges
  while (randomChallenges.length < maxAttempts) {
    const randomIndex = Math.floor(Math.random() * availableChallenges.length);
    const randomChallenge = availableChallenges[randomIndex];
    if (
      !randomChallenges.some((challenge) => challenge.id === randomChallenge.id)
    ) {
      randomChallenges.push(randomChallenge);
    }
  }

  return randomChallenges;
};

export const getFilteredChallengeData = (
  challengeData: ChallengesData[],
  completedChallenges: ChallengesData[] = []
) => {
  if (!completedChallenges.length) return challengeData;
  return challengeData.filter(
    (challenge) =>
      !completedChallenges.some((completed) => completed.id === challenge.id)
  );
};
