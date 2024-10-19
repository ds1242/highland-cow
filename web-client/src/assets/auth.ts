import { jwtDecode, JwtPayload } from 'jwt-decode';


class AuthService {
    public getId():string | null {
        const token = this.getToken();
        if (!token) {
            return null;
        }
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            return decoded.sub ?? null; // Return user ID or null if undefined
        } catch (err) {
            console.error("Failed to decode token:", err);
            return null; // Return null if decoding fails
        }
    }

    public loggedIn(): boolean {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    public isTokenExpired(token: string): boolean {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            if (decoded.exp === undefined) {
                return false;
            }
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            return true;
        }
    }

    public getToken() {
        return localStorage.getItem('id_token');
    }

    public login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        // window.location.assign('/');
    }

    public logout() {
        localStorage.removeItem('id_token');
    }
}

export default new AuthService();
