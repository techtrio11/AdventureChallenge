export type UserData = {
  id?: string;
  name?: string;
  activitiesCompleted?: ActivitiesData[];
};

export type ActivitiesData = {
  dateCompleted?: string;
  activityId?: string;
  photoName?: string;
};
