interface ActivityViewModel {
    activityId: string;
    userId: string;
    date: string;
    fitnessType: FitnessType;
    amount: number;
}

interface UserViewModel {
    userId: string;
    name: string;
    lastRecordedDate: string;
    avatarUrl: string;
    amount: number;
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

interface AwardViewModel {
    type: AwardType;
    userId: string;
    date: string;
    description: string;
    value: string;
}

declare const enum AwardType {
    Other = 0,
    TopMonthSteps = 1,
    TopWeekSteps = 2,
    TopMonthDistance = 3,
    TopWeekDistance = 4
}