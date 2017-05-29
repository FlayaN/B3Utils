interface ActivityViewModel {
    activityId: string;
    userId: string;
    date: Date;
    type: string;
    amount: number;
}

interface UserViewModel {
    userId: string;
    name: string;
    lastRecordedDate: string;
    avatarUrl: string;
    totalDistance: number;
    totalSteps: number;
}

interface IdeaViewModel {
    id: string;
    userId: string;
    userName: string;
    header: string;
    detail: string;
    messageCount: number;
    timeStamp: string;
}

interface MessageViewModel {
    id: string;
    userId: string;
    userName: string;
    ideaId: string;
    text: string;
    timeStamp: string;
}