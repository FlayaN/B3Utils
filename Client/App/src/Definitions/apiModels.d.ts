interface IActivityViewModel {
    activityId: string;
    userId: string;
    date: Date;
    type: string;
    amount: number;
}

interface IUserViewModel {
    userId: string;
    name: string;
    lastRecordedDate: string;
    avatarUrl: string;
    totalDistance: number;
}