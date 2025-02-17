export const backendPORT = 5000;
export const baseApiUrl = `http://localhost:${backendPORT}/api`;

// Auth APIs
export const signUpServiceApi = `${baseApiUrl}/auth/signUp`;
export const signInServiceApi = `${baseApiUrl}/auth/signIn`;
export const logoutUserApi = `${baseApiUrl}/auth/logout`;
export const checkAuthApi = `${baseApiUrl}/auth/checkAuth`;
export const googleAuthFirebaseServiceApi = `${baseApiUrl}/auth/googleAuthFirebase`;
