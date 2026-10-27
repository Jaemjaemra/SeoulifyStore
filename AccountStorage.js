export const getAccountStorageKey = (key) => {
    const userId = localStorage.getItem("seoulify_userId");

    if(!userId) {
        return `guest_${key}`;

    }
    return  `seoulify_user_${userId}_${key}`;
};