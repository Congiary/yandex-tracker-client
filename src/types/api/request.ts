export interface IssueUser {
    id: string;
}

export interface IssueQueue {
    id?: string;   // Идентификатор очереди (опционально)
    key?: string;  // Ключ очереди (опционально)
}

export interface Issueinterface {
    id?: string;   // Идентификатор типа задачи (опционально)
    key?: string;  // Ключ типа задачи (опционально)
}

export interface CreateIssue {
    summary: string;                  // Название задачи (обязательный параметр)
    queue: IssueQueue | string | number;   // Очередь задачи (объект, строка или число)
    parent?: any;         // Родительская задача (опционально)
    description?: string;             // Описание задачи (опционально)
    sprint?: Array<object | string>;  // Спринт (опционально)
    interface?: Issueinterface | string | number; // Тип задачи (опционально)
    followers?: Array<IssueUser | string | number>; // Наблюдатели (опционально)
    assignee?: IssueUser | string | number;  // Исполнитель (опционально)
    author?: IssueUser | string | number;      // Автор (опционально)
    unique?: string;                // Поле с уникальным значением (опционально)
    attachmentIds?: string[];        // Список идентификаторов вложений (опционально)
}