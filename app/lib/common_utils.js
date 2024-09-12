export const formatPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
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
