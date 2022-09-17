import config from "./_config";

interface User {
  createdAt: string;
  name: string;
  id: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const result = await fetch(`${config.baseURL}/users`);
  const data = result.json();

  if (!result.ok) {
    throw data;
  }

  return data;
};
