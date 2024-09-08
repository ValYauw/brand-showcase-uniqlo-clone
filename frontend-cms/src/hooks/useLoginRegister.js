import { BASE_URL } from "../config/api";

export function useLogin(email, password) {
  fetch(`${BASE_URL}/login`, {
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(({access_token}) => {
      localStorage.setItem('access_token', access_token)
    })
    .catch(console.log);
}

export function useRegister(name, email, password) {
  fetch(`${BASE_URL}/register`, {
    body: JSON.stringify({ name, email, password })
  })
    .then(response => response.json())
    .then(() => {
      login(email, password);
    })
    .catch(console.log);
}