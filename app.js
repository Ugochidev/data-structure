const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const app = express();
app.use(express.json());

const { v4: uuidv4 } = require("uuid");
uuidv4();

let users = [
  {
    firstName: "Tope",
    lastName: "Ade",
    age: "345",
  },
  {
    firstName: "Chioma",
    lastName: "Ugochukwu",
    age: "378",
  },
];

app.get("/", (req, res) => {
  res.send("Hello world");
});

router.get("/users", (req, res) => {
  console.log(users);
  res.send(users);
});

router.post("/addUsers", (req, res) => {
  const user = req.body;
  const userId = uuidv4();
  const realUser = { ...user, id: userId, dateCreated: new Date() };
  res.json({
    message: `${user.firstName} has been added.`,
    realUser,
  });
  users.push(realUser);
});
app.use(router);

router.get("/singleUser/:id", (req, res) => {
  const { id } = req.params;
  const singleUser = users.find((user) => user.id === id);
  res.send(singleUser);
});


router.delete("/removeUser/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.send("User has been deleted");
});

router.patch("/updateUser/:id", (req, res) => {
  const { id } = req.params;
  const {firstName, lastName, age} = req.body
  const patchUser = users.find((user) => user.id === id);
  if(firstName)users.firstName = firstName;
  if (lastName)users.lastName = lastName;
  if (age)users.age = age;
  res.send(`user with the id ${id} has been updated`);
});

app.listen(2087, () => console.log("server is up and running"));
