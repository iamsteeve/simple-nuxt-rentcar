import humbleLocalstorage from 'humble-localstorage';

/**
 * Interface of Role object in Backend Strapi
 */
export interface Role {
    type: string;
    description: string;
    name: string;
    _id: string;
}

/**
 * Interface of User object in Backend Strapi
 */
export interface User {
    _id: string;
    blocked: boolean;
    confirmed: boolean;
    email: string;
    provider: string;
    username: string;
    role: Role;
}

class AuthenticationService {
    public static instance: AuthenticationService;
    public static getInstance() {
        if (!AuthenticationService.instance) {
            AuthenticationService.instance = new AuthenticationService();
            // ... any one time initialization goes here ...
        }
        return AuthenticationService.instance;
    }
    private constructor() {
        // do something construct...
    }

    public saveUser(user: User): void {
        humbleLocalstorage.setObject('user', user);
    }

    public getUser(): User {
        return humbleLocalstorage.getObject('user') as User;
    }

    public getRole(): Role {
        const user = humbleLocalstorage.getObject('user') as User;
        return user.role;
    }

    public getJwt(): string | null {
        return humbleLocalstorage.getItem('jwt');
    }

    public deleteUserProfileAndJWT(): void {
        humbleLocalstorage.removeItem('user');
        humbleLocalstorage.removeItem('jwt');
    }
}

export default AuthenticationService.getInstance();
