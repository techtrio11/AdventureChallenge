export type UserData = {
  id?: string;
  name?: string;
  streak?: number;
  activitiesCompleted?: ActivitiesData[];
};

export type ActivitiesData = {
  dateCompleted?: string;
  activityId?: string;
  photoName?: string;
};

export type ActivityCompletedData = {
  name?: string;
  streak?: number;
  challengeName?: string;
  photoName?: string;
  imageUrl?: string;
};

export const blankUserData: UserData = {
  name: "",
  streak: 0,
  activitiesCompleted: [],
};
