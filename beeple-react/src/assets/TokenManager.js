class TokenManager {
    static setTokens(accessToken, refreshToken) {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
    }

    static getAccessToken() {
        return sessionStorage.getItem('accessToken');
    }

    static getRefreshToken() {
        return sessionStorage.getItem('refreshToken');
    }

    static clearTokens() {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    }
}

export default TokenManager;
