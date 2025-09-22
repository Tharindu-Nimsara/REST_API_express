const express = require("express");
const app = express();
const PORT = 3000;

//this transfer the body of the request to a json object
app.use(express.json());

//middleware (this convert param ids to numbers because they are strings by default)
const convertParams = (req, res, next) => {
  const { id } = req.params;
  req.params.id = parseInt(id);
  next();
};

//Normal get req to root
app.get("/", (req, res) => {
  res.send("Success!");
});

let blogs = [];

//READ
app.get("/blogs", (req, res) => {
  res.json(blogs);
});

//CREATE
app.post("/blogs", (req, res) => {
  blogs.push({ id: blogs.length + 1, ...req.body });
  res.status(201).send({ message: "Ok!" });
});

//UPDATE
app.put("/blogs/:id", convertParams, (req, res) => {
  const { id } = req.params;
  const index = blogs.findIndex((item) => item.id == id);
  blogs[index] = req.body;
  res.send(blogs[index]);
});

//GET with ID
app.get("/blogs/:id",convertParams, (req, res)=>{
  const {id} = req.params;
  const index = blogs.findIndex((item)=> item.id == id);
  res.send(blogs[index]);
})

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
