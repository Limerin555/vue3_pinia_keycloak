import axiosInstance from "@services/api";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // If user is authenticated, place access token in request header.
      if (store.authenticated) {
        config.headers["x-access-token"] = store.user.token;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const oriConfig = error.config;

      if (error.response?.status === 401 && !oriConfig._retry) {
        oriConfig._retry = true;

        try {
          // Refresh token then retry once
          await store.refreshUserToken();

          // Place refreshed access token in the request header
          oriConfig.headers.headers["x-access-token"] = store.user.token;

          return axiosInstance(oriConfig);
        } catch (_error) {
          console.error("Refresh token failed");
          console.error(_error);

          return Promise.reject(_error);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setup;