export const isLogin = {
    loginState() {
        const token = sessionStorage.getItem("login");
        return !!token ? true : false;
        // return true;
    },
    setLogin(token) {
        sessionStorage.setItem("login", token);
        return true;
    },
    loginout() {
        sessionStorage.removeItem('login');
    }
};