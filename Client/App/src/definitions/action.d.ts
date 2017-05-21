interface Action<T>{
    type: string;
    data: T;
    error?: boolean;
    meta?: any;
}

interface NavigateData {
    to: string;
    params?: any;
}

interface UserActivities {
    userId: string;
    activities: IActivityViewModel[];
}