import { getAllUsers } from "src/models/userModels";

const getUsers = async (req, res) => {
  try {
    const users = getAllUsers();
    res.writeHead(200, { contentType: "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

export { getUsers };