// Определение типов ролей пользователей
export enum UserRoles {
    User = 'User',
    AdvancedUser = 'AdvancedUser',
    Administrator = 'Administrator'
}

// Модель регистрации пользователя
export interface RegisterModel {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRoles;
}

// Модель для данных пользователя (может быть расширена по мере необходимости)
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: UserRoles[];
}

// Модель ответа при логине
export interface AuthResponse {
    token: string;
    // user: User;
}

// Модель логина пользователя
export interface LoginModel {
    email: string;
    password: string;
}

// Примечание: дополнительные типы можно добавить по мере необходимости для других частей вашего приложения