// AuthService.js (Separate file for authentication-related functions)

export const logout = () => {
  // Clear user data from local storage or perform any other necessary actions
  sessionStorage.removeItem("token");
};
