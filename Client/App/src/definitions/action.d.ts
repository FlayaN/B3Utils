interface Action<T>{
    type: string;
    data: T;
    error?: boolean;
    meta?: any;
}