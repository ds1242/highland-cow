import { jwtDecode, JwtPayload } from 'jwt-decode';


class AuthService {

    public loggedIn(): boolean {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    private isTokenExpired(token: string): boolean {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            if (decoded.exp === undefined) {
                return false;
            }
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            return false;
        }
    }

    private getToken() {
        return localStorage.getItem('id_token');
    }

    public login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    public logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();
