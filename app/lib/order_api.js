const getBaseUrl = () => {
  return process.env.BASE_BE_URL || "http://localhost:8080/api/v1";
};

export const checkout = async(addressId, accessToken) => {
  const uri = `${getBaseUrl()}/orders/checkout?addressId=${addressId}`;
  const response = await fetch(uri, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return await response.json();
}