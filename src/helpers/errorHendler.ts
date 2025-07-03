import { AxiosError } from "axios";

const errorHandler = {
  alert: function (message: string) {
    alert(message);
  },
  addAction: function (message: string, error?: unknown) {
    if (process.env.NODE_ENV === "development") {
      throw new Error(message);
    } else {
      console.error(message, error);
    }
  },

  axiosError: function (message: string, error: unknown) {
    if (error instanceof AxiosError) {
      this.alert(error.response?.data.error.message || error.message);
    } else {
      this.alert(message);
    }
  },
};

export default errorHandler;
