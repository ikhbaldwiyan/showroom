import { toast } from "react-toastify";

export const showToast = (type, message) => {
  if (type === "success") {
    toast.success(message, {
      theme: "colored",
    });
  } else if (type === "error") {
    toast.error(message, {
      theme: "colored",
    });
  } else if (type === "info") {
    toast.info(message, {
      theme: "colored",
    });
  } else {
    toast.success(message, {
      theme: "colored",
    });
  }
};
