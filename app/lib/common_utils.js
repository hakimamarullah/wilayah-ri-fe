export const formatPrice = (price) => {
  // Format the price using Indonesian locale and currency
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);

  // Replace the comma with a dot and remove spaces
  return formattedPrice.replace(/\s/g, "");
};

export const formatSimNumber = (simNumber) => {
  return simNumber.replace(/(\d{4})(?=\d)/g, "$1-");
};

export const formatAddress = (address) => {
  const { details, village, subDistrict, district, province, zipCode } =
    address || {};
  return `${details}, ${village}, ${subDistrict}, ${district}, ${province} ${zipCode}`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const handleAxiosError = (error, callback) => {
  const data = error.response?.data;
  if (data) {
    if (data.responseCode === 401) {
      callback("/auth/signin");
    }
    return data;
  }
  throw error;
};

export const getAlertByHttpCode = (httpCode) => {
  if (httpCode <= 200) {
    return {
      title: "Success",
      color: "success",
      message: "Operation Successful",
    };
  } else if (httpCode >= 400) {
    return {
      title: "Warning",
      color: "warning",
      message:
        httpCode === 404
          ? "Data Not Found"
          : "Please make sure all the data is valid",
    };
  }
  return {
    title: "Application Error",
    color: "danger",
    message: "Something went wrong",
  };
};
