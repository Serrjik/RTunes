// Вспомогательные функции.

// Функция добавляет незначащие нули ко времени (чтобы было 2 цифры).
export const addZero = n => n < 10 ? '0' + n : n