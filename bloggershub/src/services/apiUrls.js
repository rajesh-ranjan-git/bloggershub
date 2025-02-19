export const backendPORT = 5000;
export const baseApiUrl = `http://localhost:${backendPORT}/api`;

// Auth APIs
export const signUpServiceApi = `${baseApiUrl}/auth/signUp`;
export const signInServiceApi = `${baseApiUrl}/auth/signIn`;
export const logoutUserServiceApi = `${baseApiUrl}/auth/logout`;
export const checkAuthServiceApi = `${baseApiUrl}/auth/checkAuth`;
export const googleAuthFirebaseServiceApi = `${baseApiUrl}/auth/googleAuthFirebase`;

// Posts APIs
export const fetchAllPostsServiceApi = `${baseApiUrl}/posts/fetchAllPosts`;
export const fetchLatestPostsServiceApi = `${baseApiUrl}/posts/fetchLatestPosts`;
export const fetchSinglePostServiceApi = `${baseApiUrl}/posts/fetchSinglePost`;

// Comments APIs
export const fetchAllCommentsOnPostServiceApi = `${baseApiUrl}/comments/fetchAllCommentsOnPost`;
