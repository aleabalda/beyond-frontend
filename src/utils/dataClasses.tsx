interface userRegisterData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    isGoogle: boolean;
}

interface userLoginData {
    email: string;
    password: string;
    isGoogle: boolean;
}

export type { userRegisterData, userLoginData };