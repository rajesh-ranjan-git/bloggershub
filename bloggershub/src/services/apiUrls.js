export const backendPORT = 5000;
export const baseApiUrl = `http://localhost:${backendPORT}/api`;

// Auth APIs
export const checkAuthServiceApi = `${baseApiUrl}/auth/checkAuth`;
export const signUpServiceApi = `${baseApiUrl}/auth/signUp`;
export const signInServiceApi = `${baseApiUrl}/auth/signIn`;
export const signOutServiceApi = `${baseApiUrl}/auth/signOut`;
export const firebaseGoogleAuthServiceApi = `${baseApiUrl}/auth/firebaseGoogleAuth`;
export const forgotPasswordServiceApi = `${baseApiUrl}/auth/forgotPassword`;

// Posts APIs
export const fetchAllPostsServiceApi = `${baseApiUrl}/posts/fetchAllPosts`;
export const fetchLatestPostsServiceApi = `${baseApiUrl}/posts/fetchLatestPosts`;
export const fetchSinglePostServiceApi = `${baseApiUrl}/posts/fetchSinglePost`;
export const fetchAllPostsByAuthorServiceApi = `${baseApiUrl}/posts/fetchAllPostsByAuthor`;

// Comments APIs
export const fetchAllCommentsOnPostServiceApi = `${baseApiUrl}/comments/fetchAllCommentsOnPost`;
export const addCommentServiceApi = `${baseApiUrl}/comments/addComment`;
export const deleteCommentServiceApi = `${baseApiUrl}/comments/deleteComment`;
export const likeCommentServiceApi = `${baseApiUrl}/comments/likeComment`;
export const updateCommentServiceApi = `${baseApiUrl}/comments/updateComment`;

// Profile APIs
export const fetchProfileServiceApi = `${baseApiUrl}/profile/fetchProfile`;
