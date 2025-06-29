export const CASHBACK_FORM_ADD_TITLE = 'Добавить категорию';
export const CASHBACK_FORM_EDIT_TITLE = 'Изменить категорию';
export const CASHBACK_FORM_ADD = 'Добавить';
export const CASHBACK_FORM_EDIT = 'Изменить';
export const CASHBACK_FORM_ADD_MORE = 'Добавить еще категорию';
export const CASHBACK_FORM_ADDED = 'Категория успешно добавлена';
export const CASHBACK_FORM_ADDED_EVENT = '+1 категория!';
const CASHBACK_FORM_ERROR = 'Такая категория уже добавлена в';

export const getCashbackErrorText = (month: string) => {
    return `${CASHBACK_FORM_ERROR} ${month}.`
}
