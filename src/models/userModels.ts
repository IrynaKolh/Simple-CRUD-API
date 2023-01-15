import { User, UserData } from "./interfaces";
import { v4 as uuidv4 } from 'uuid';

let users: User[] = [];

export const getAllUsers = () => {
  return users;
};

export const getOneUser = (id: string): User | null => {
  return users.find((user) => user.id === id) ?? null
}

export const addNewUser = (user: UserData) : User => {
  users.push({ id: uuidv4(), ...user });
  return users[users.length - 1];
}

export const deleteOneUser = (id: string) => {
 return users.filter((user) => user.id !== id);
}

export const updateOneUser = (id: string, user: UserData) : User => {
  const index = users.findIndex((el) => el.id === id);
    if (index < 0) throw new Error();
    if (user.username) users[index].username = user.username;
    if (user.age) users[index].age = user.age;
    if (user.hobbies) users[index].hobbies = user.hobbies;
  return users[index];
}