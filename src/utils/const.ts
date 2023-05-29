export const ORDER_STATUS: {[key: string]: string} = {
    CREATED: 'created',
    PENDING: 'pending',
    DONE: 'done'
} as const;

export const ORDER_STATUS_TITLE: {[key: keyof typeof ORDER_STATUS]: string} ={
    [ORDER_STATUS.CREATED]: "Создан",
    [ORDER_STATUS.PENDING]: "Готовится",
    [ORDER_STATUS.DONE]: "Выполнен",
} as const;