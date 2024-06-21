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

export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    category: Category;
    description: string;
    price: string;
    generalNote: string;
    specialNote: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isLocked: boolean;
  }