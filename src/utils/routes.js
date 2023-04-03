export const ROUTES = {
    CONSTRUCTOR: '/',
    INGREDIENT: '/ingredients/:ingredientId',
    ORDER: '/profile/orders/:orderNumber',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    PROFILE: '/profile',
    PROFILE_ORDERS: '/profile/orders',
    PROFILE_LOGOUT: '/profile/logout'
}

export const routeReplacePathParams = (path, pathParams = {}) => {
    let pathFinal = path;
    for (let param in pathParams) {
        pathFinal = pathFinal.replace(`:${param}`, pathParams[param]);
    }
    return pathFinal;
};