const errorHandler = {
  alert: (message: string) => {
    alert(message);
  },
  addAction: (message: string, error?: unknown) => {
    if (process.env.NODE_ENV === "development") {
      throw new Error(message);
    } else {
      console.error(message, error);
    }
  },
};

export default errorHandler;
