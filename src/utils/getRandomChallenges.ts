import { ChallengesData } from "../types";

export const getRandomChallenges = (
  challengeData: ChallengesData[],
  completedChallenges: ChallengesData[] = [],
  excludeChallenges: ChallengesData[] = [],
  maxChallenges: number = 2
): ChallengesData[] => {
  //filter out the challenges the user has already completed
  let availableChallenges = challengeData.filter(
    (challenge) =>
      !completedChallenges.some((excluded) => excluded.id === challenge.id)
  );
  //if there are more then 3 challenges then filter out the challenges already offered to the user
  if (challengeData.length > 3 && excludeChallenges.length === 0) {
    excludeChallenges = challengeData.filter(
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
