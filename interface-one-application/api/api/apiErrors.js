import { toast } from "react-toastify";

export const handleError = (error) => {
  toast.error(
    error?.response?.data?.messsage ||
      error?.response?.data?.error ||
      error?.message ||
      error?.error?.error ||
      "Something went wrong"
  );
};
