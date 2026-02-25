export const getNextMonthDate = (): Date => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    return date;
};
