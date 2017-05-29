interface Action<T>{
    type: string;
    data: T;
}

interface NavigateData {
    to: string;
    params?: any;
}

interface UserActivities {
    userId: string;
    activities: ActivityViewModel[];
}

interface IdeaMessages {
    ideaId: string;
    messages: MessageViewModel[];
}