import axios from 'axios';
import AuthManager from './AuthManager';

const errors = {
  TOKEN_EXPIRED: 'Your session expired. Please login again',
};

class APIService {
  #fetch = async (params) => {
    const { url, data, method, _retry = false } = params;
    if (AuthManager.isAccessTokenExpired()) {
      await this.#tryRefreshingOrLoutAndThrow();
    }
    try {
      const result = await axios(url, {
        headers: {
          Authorization: AuthManager.getAccessToken(),
        },
        method,
        data,
      });
      return result.data;
    } catch (e) {
      if (e?.response?.status === 401) {
        if (_retry) {
          this.logout();
          throw new Error(errors.TOKEN_EXPIRED);
        }

        try {
          await this.refreshToken();
        } catch {
          throw new Error(errors.TOKEN_EXPIRED);
        }
        const retryData = await this.#fetch({ ...params, _retry: true });
        return retryData;
      }
      throw e;
    }
  };

  #tryRefreshingOrLoutAndThrow = async () => {
    try {
      await this.refreshToken();
    } catch (e) {
      this.logout();
      throw new Error(errors.TOKEN_EXPIRED);
    }
  };

  refreshToken = async () => {
    const refreshToken = AuthManager.getRefreshToken();
    const {
      data: { accessToken },
    } = await axios.post('/api/auth/token', { token: refreshToken });
    AuthManager.setAccessToken(accessToken);
  };

  #injectResponseMessageToError = (error) => {
    const message = error.response?.data?.error;
    // eslint-disable-next-line no-param-reassign
    if (message) error.message = message;
  };

  login = async ({ email, password }) => {
    try {
      const {
        data: { accessToken, refreshToken },
      } = await axios.post('/api/auth/login', { email, password });
      AuthManager.login({ accessToken, refreshToken });
    } catch (error) {
      this.#injectResponseMessageToError(error);
      throw error;
    }
  };

  logout = async () => {
    const token = AuthManager.getRefreshToken();
    if (token) {
      const result = axios.post('/api/auth/logout', { token });
      AuthManager.logout();
      return result;
    }
    AuthManager.logout();
    return null;
  };

  registration = async ({ email, password }) => {
    try {
      const {
        data: { accessToken, refreshToken },
      } = await axios.post('/api/auth/registration', { email, password });
      AuthManager.registration({ accessToken, refreshToken });
    } catch (error) {
      this.#injectResponseMessageToError(error);
      throw error;
    }
  };
}

export default new APIService();
