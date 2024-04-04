const express = require("express");
const app = express();
let { people } = require("./data");

app.use(express.static("./methods-public"));
// parse data from form
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});
app.post("/api/people", (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (!name) {
    res.status(400).send("Provide a valid username");
  }
  res.status(201).json({ success: true, person: name });
});

// post method using form
// app.post("/login", (req, res) => {
//   const { name } = req.body;
//   console.log(name);
//   if (name.length < 2) {
//     return res.status(200).send(`Name should be atleast 3 characters`);
//   } else if (name.length > 2) {
//     return res.status(200).send(`Welcome ${name}`);
//   } else {
//     res.status(400).send("Provide a valid username");
//   }
// });

app.post("/login", (req, res) => {
  const { mail, password } = req.body;
  console.log(mail, password);
  return res.status(200).send(`Welcome ${mail}`);

  // if (name.length < 2) {
  //   return res.status(200).send(`Name should be atleast 3 characters`);
  // } else if (name.length > 2) {
  //   return res.status(200).send(`Welcome ${name}`);
  // } else {
  //   res.status(400).send("Provide a valid username");
  // }
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person1 = people.find((person) => person.id === Number(id));
  console.log(person1);
  if (!person1) {
    return res
      .status(404)
      .json({ success: false, msg: `id ${id} doesnot exists` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
});

app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === Number(id));
  console.log(person, people);
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );
  return res.status(200).json({ success: true, data: newPeople });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
