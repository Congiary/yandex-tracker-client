interface User {
    self: string;         // Адрес ресурса API
    id: string;           // Идентификатор пользователя
    display: string;      // Отображаемое имя пользователя
    passportUid?: number; // Уникальный идентификатор аккаунта (опционально)
}

interface IssueType {
    self: string;         // Адрес ресурса API для типа задачи
    id: string;           // Идентификатор типа задачи
    key: string;          // Ключ типа задачи
    display: string;      // Отображаемое название типа задачи
}

interface IssuePriority {
    self: string;         // Адрес ресурса API для приоритета
    id: string;           // Идентификатор приоритета
    key: string;          // Ключ приоритета
    display: string;      // Отображаемое название приоритета
}

interface IssueQueue {
    self: string;         // Адрес ресурса API для очереди
    id: string;           // Идентификатор очереди
    key: string;          // Ключ очереди
    display: string;      // Отображаемое название очереди
}

interface IssueProject {
    self: string;         // Адрес ресурса API для проекта
    id: string;           // Идентификатор проекта
    display: string;      // Отображаемое название проекта
}

interface IssueStatus {
    self: string;         // Адрес ресурса API для статуса
    id: string;           // Идентификатор статуса
    key: string;          // Ключ статуса
    display: string;      // Отображаемое название статуса
}

export interface Issue {
    self: string;                     // Адрес ресурса API для задачи
    id: string;                       // Идентификатор задачи
    key: string;                      // Ключ задачи
    version: number;                  // Версия задачи
    lastCommentUpdatedAt: string;     // Дата и время последнего комментария
    summary: string;                  // Название задачи
    aliases?: string[];               // Альтернативные ключи задачи (опционально)
    updatedBy: User;                  // Последний сотрудник, изменивший задачу
    description?: string;             // Описание задачи (опционально)
    type: IssueType;                   // Тип задачи
    priority: IssuePriority;               // Приоритет задачи
    createdAt: string;                // Дата и время создания задачи
    followers?: User[];               // Наблюдатели задачи (опционально)
    createdBy: User;                  // Создатель задачи
    votes: number;                    // Количество голосов за задачу
    assignee?: User;                  // Исполнитель задачи (опционально)
    project: IssueProject;                 // Проект задачи
    queue: IssueQueue;                     // Очередь задачи
    updatedAt: string;                // Дата и время последнего обновления
    status: IssueStatus;                   // Текущий статус задачи
    previousStatus?: IssueStatus;          // Предыдущий статус задачи (опционально)
    favorite: boolean;                // Признак избранной задачи
}