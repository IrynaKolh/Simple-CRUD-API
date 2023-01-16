import { addNewUser, deleteOneUser, getAllUsers, getOneUser, updateOneUser } from "../models/userModels";
import { validate } from 'uuid';
import { HttpStatusCode } from "../models/interfaces";
import { User, UserData } from "../models/interfaces";


const getUsers = async (req, res) => {
  try {
    const users = getAllUsers();
    res.writeHead(HttpStatusCode.OK, { contentType: "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

const getUser =  async (req, res, id) => {
  try {
    const user = getOneUser(id);
    if (!user) {
      if (!validate(id)) {
        res.writeHead(HttpStatusCode.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `id ${id} is invalid` }));
      } else {
        res.writeHead(HttpStatusCode.NOT_FOUND, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({ message: `User with id ${id} doesn't exist` })
        );
      }
    } else {
      res.writeHead(HttpStatusCode.OK, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
}

const createUser = async (req, res) => {
  try {
    let body = "";
    for await (const chunk of req) {
      body += chunk
    }

    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !hobbies) {
      res.writeHead(HttpStatusCode.BAD_REQUEST, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'User data does not contain all required fields',
        })
      );
    } else if (
      typeof username !== 'string' ||
      typeof age !== 'number' ||
      !Array.isArray(hobbies)
    ) {
      res.writeHead(HttpStatusCode.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Wrong types of fields' }));
    } else {
      const newUser: UserData = addNewUser({ username, age, hobbies });
      res.writeHead(HttpStatusCode.CREATED, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    }
  } catch (error) {
    res.writeHead(HttpStatusCode.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `${error}` }));
  }
};

const deleteUser = async (req, res, id) => {
  try {
    const user = getOneUser(id);
    if (!user) {
      if (!validate(id)) {
        res.writeHead(HttpStatusCode.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `id ${id} is invalid` }));
      } else {
        res.writeHead(HttpStatusCode.NOT_FOUND, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({ message: `user with id ${id} doesn't exist` })
        );
      }
    } else {
      deleteOneUser(id);
      res.writeHead(HttpStatusCode.NO_CONTENT, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res, id) => {
  try {
    let body = "";
    for await (const chunk of req) {
      body += chunk
    }
    const { username, age, hobbies } = JSON.parse(body);
    const user = getOneUser(id);

    if (!user) {
      if (!validate(id)) {
        res.writeHead(HttpStatusCode.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `id ${id} is invalid` }));
      } else {
        res.writeHead(HttpStatusCode.NOT_FOUND, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({ message: `User with id ${id} doesn't exist` })
        );
      }
    } else if (!username || !age || !hobbies) {
      res.writeHead(HttpStatusCode.BAD_REQUEST, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'User data does not contain all required fields',
        })
      );
    } else if (
      typeof username !== 'string' ||
      typeof age !== 'number' ||
      !Array.isArray(hobbies)
    ) {
      res.writeHead(HttpStatusCode.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Wrong types of fields' }));
    } else {
      const newUser = updateOneUser(id, { username, age, hobbies });
      res.writeHead(HttpStatusCode.OK, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    }
  } catch (error) {
    res.writeHead(HttpStatusCode.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `${error}` }));
  }
};

export { getUsers, getUser, createUser, deleteUser, updateUser };