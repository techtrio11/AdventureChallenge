import { ChallengesData } from "../types";

export const availableChallenges = (
  challengeData: ChallengesData[],
  completedChallenges: ChallengesData[] = []
): ChallengesData[] => {
  //filter out the challenges the user has already completed
  let availableChallenges = challengeData.filter(
    (challenge) =>
      !completedChallenges.some((excluded) => excluded.id === challenge.id)
  );
  return availableChallenges;
};
