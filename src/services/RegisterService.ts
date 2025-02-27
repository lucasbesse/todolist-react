import { User } from "../interfaces/User.interface";
const API_URL = `${process.env.REACT_APP_API_URL}/user/`;
const LOGIN_API_URL = `${process.env.REACT_APP_API_URL}/login/`;

export const registerUser = async (user: User): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar usuário");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const loginUser = async (user: User) => {
  try {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Erro ao realizar login");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
