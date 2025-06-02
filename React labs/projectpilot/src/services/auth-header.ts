export default function authHeader() {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
