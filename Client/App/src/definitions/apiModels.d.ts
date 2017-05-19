interface IActivityViewModel {
    userId: string;
    startDate: string;
    endDate: string;
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