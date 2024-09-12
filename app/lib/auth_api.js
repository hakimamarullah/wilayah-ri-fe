
export const signUp = async (formData) => {
  const requestBody = {
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    roleIds: JSON.parse(formData.get("roleIds")),
  };

  return postJson({uri: "/auth/register", body: requestBody})
};

export const postSignIn = async (credentials) => {
  return postJson({uri: "/auth/login", body: credentials});
};

export const postJson = async ({ uri, body, headers }) => {
  const response = await fetch(`${getBaseUrl()}${uri}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      ...headers,
    },
  });

  const responseBody = await response.json();
  console.log({responseBody})
  return responseBody;
};

export const getUserInfo = (accessToken) => {
   return fetch(`${getBaseUrl()}/auth/userInfo`, {
     headers: {
       Authorization: `Bearer ${accessToken}`
     }
   }).then(res => res.json())
    .catch(err => null)
}

const getBaseUrl = () => {
  return process.env.BASE_BE_URL || "http://auth-service-dev.local";
};
