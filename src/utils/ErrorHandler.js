// utils/errorHandler.js
import { notification } from "antd";

class ErrorHandler {
  static handleError(error) {
    const { response } = error;

    if (response) {
      const { status, data } = response;

      // Handle 401 (Unauthorized) error
      if (status === 401) {
        notification.error({
          message: "Unauthorized",
          description: "Token does not match or has expired.",
          placement: "topRight",
        });
      }

      // Handle 404 (Not Found) error
      else if (status === 404) {
        notification.error({
          message: "Not Found",
          description: "The requested resource could not be found.",
          placement: "topRight",
        });
      }

      // Handle 500 (Internal Server Error) error
      else if (status === 500) {
        notification.error({
          message: "Internal Server Error",
          description: "An unexpected error occurred. Please try again later.",
          placement: "topRight",
        });
      }

      // Handle 422 (Validation errors) or custom errors from backend
      else if (status === 422 && data.errors) {
        // Extract and show only the first error message for each field
        const errorMessages = Object.keys(data.errors).map(
          (key) => data.errors[key][0] // Get the first error message for each field
        );
        notification.error({
          message: "Validation Errors",
          description: errorMessages.join(" | "),
          placement: "topRight",
        });
      }

      // Handle custom or other errors
      else {
        notification.error({
          message: "Error",
          description: data.message || "Something went wrong. Please try again.",
          placement: "topRight",
        });
      }
    } else {
      notification.error({
        message: "Network Error",
        description: "Unable to connect to the server.",
        placement: "topRight",
      });
    }
  }
}

export default ErrorHandler;
