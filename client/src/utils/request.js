let startLoading;
let stopLoading;
let logoutHandler;

export function setLoadingHandlers(handlers) {
  startLoading = handlers.startLoading;
  stopLoading = handlers.stopLoading;
}

export function setLogoutHandler(handler) {
  logoutHandler = handler;
}

const request = async (method, url, data, options = {}) => {
  try {
    startLoading?.();

    if (method !== "GET") {
      options.method = method;
    }

    if (data) {
      options = {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(data),
      };
    }

    const response = await fetch(url, options);

    const responseContentType = response.headers.get("Content-Type");
    if (!responseContentType) {
      return;
    }

    if (!response.ok) {
      if (response.status === 401) {
        logoutHandler?.(); // auto logout
      }
      const result = await response.json();
      throw result;
    }

    const result = await response.json();
    return result;
  } finally {
    stopLoading?.();
  }
};

export default {
  get: request.bind(null, "GET"),
  post: request.bind(null, "POST"),
  put: request.bind(null, "PUT"),
  delete: request.bind(null, "DELETE"),
  baseRequest: request,
};
