import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators';

import store from '@/store/store';
import StrapiService from '@/services/StrapiService';
import AuthenticateService, {User} from '@/services/AuthenticationService';
/**
 * PayLoad LoginError Interface
 */
export interface LoginErrorPayload {
    isFailed: boolean;
    errorMessage: string;
}

/**
 * Payload UserAuth Interface
 */
export interface UserAuthPayload {
    jwt: string;
    user: User;
}


@Module({
    dynamic: true,
    namespaced: true,
    name: 'auth',
    store,
})
class Authentication extends VuexModule {

    public isLogged = !!AuthenticateService.getJwt();

    public isLoading: boolean = false;

    public jwt: string | null = AuthenticateService.getJwt();

    public user = AuthenticateService.getUser();

    public error: LoginErrorPayload = {
        isFailed: false,
        errorMessage: '',
    };

    @Mutation
    public loginRequest(): void {
        this.isLoading = true;
        this.jwt = '';
        this.isLogged = false;
        this.error.isFailed = false;
        this.error.errorMessage = '';
    }

    @Mutation
    public logoutSuccess(): void {
        this.isLoading = false;
        this.jwt = '';
        this.isLogged = false;
        this.error.isFailed = false;
        this.error.errorMessage = '';
    }

    @Mutation
    public loginSuccess(userAuth: UserAuthPayload): void {
        this.isLoading = false;
        this.isLogged = true;
        this.jwt = userAuth.jwt;
        this.user = userAuth.user;
        this.error.isFailed = false;
        this.error.errorMessage = '';
    }

    @Mutation
    public loginError(errorMessage: string): void {
        this.user = {} as User;
        this.jwt = '';
        this.isLoading = false;
        this.isLogged = false;
        this.error.isFailed = true;
        this.error.errorMessage = errorMessage;
    }

    @Action
    public async login(dataLoginForm: any): Promise<any> {

        try {
            this.context.commit('loginRequest');
            const user = await StrapiService.Strapi.login(dataLoginForm.identifier, dataLoginForm.password);
            this.context.commit('loginSuccess', user);
            AuthenticateService.saveUser(user.user as User);
        } catch (e) {
            this.context.commit('loginError', e.message);
        }
    }

    @Action
    public async logout(): Promise<any> {
        AuthenticateService.deleteUserProfileAndJWT();
        this.context.commit('logoutSuccess');
    }

}

export default getModule(Authentication);
