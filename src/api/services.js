import API from "./axios";

const API_KEY = "c02c13b02d9d2a9f1cb9b2503e24b89a";

export const getServices = async () => {
  try {
    const res = await API.post("", {
      key: API_KEY,
      action: "services",
    });

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "فشل تحميل الخدمات",
    };
  }
};
