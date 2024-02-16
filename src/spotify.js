import axios from 'axios';

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = '132969ed6476475593555f08c0ab27cc';
const redirectUri = 'http://localhost:3000';
const scopes = ["user-library-read","playlist-read-private","user-read-recently-played","user-read-private",
            "user-top-read","user-read-playback-position","user-read-playback-state","user-modify-playback-state",
            "user-follow-modify","playlist-read-collaborative","user-follow-read","user-read-currently-playing",
            "user-library-modify","playlist-modify-private","playlist-modify-public","user-read-email"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      // Handle token refresh logic here
    }
    return Promise.reject(error);
  }
);

export default apiClient;
