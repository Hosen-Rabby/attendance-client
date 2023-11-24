const express = require("express");
const app = express();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 1000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.smfjp.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

console.log(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to the database.");

    // collections
    const database = client.db("samadb");
    const departmentCollection = database.collection("department");
    const teacherCollection = database.collection("teacher");
    const studentCollection = database.collection("students");
    const batchCodeCollection = database.collection("batchCode");
    const presentCollection = database.collection("attendStudents");
    const usersCollection = database.collection("users");
    const coursesCollection = database.collection("courses");
    const individualAttendCollection = database.collection("individualAttend");
    const routineCollection = database.collection("routine");
    // // Define a schema for the routine data
    // const routineSchema = new mongoose.Schema({
    //   day: String,
    //   time: String,
    //   teacher: String,
    //   subjectCode: String,
    // });

    // // Create a model based on the schema
    // const Routine = mongoose.model("Routine", routineSchema);

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ====================== attendace start ==================
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // post department
    app.post("/department", async (req, res) => {
      const department = req.body;
      const result = await departmentCollection.insertOne(department);
      res.json(result);
    });

    // post teacher
    app.post("/users", async (req, res) => {
      const body = req.body;
      const result = await usersCollection.insertOne(body);
      res.json(result);
    });

    // post student
    // app.post("/students", async (req, res) => {
    //   const student = req.body;
    //   const result = await studentCollection.insertOne(student);
    //   res.json(result);
    // });

    // post batchcode
    app.post("/batchCodes", async (req, res) => {
      const batchCodes = req.body;
      const result = await batchCodeCollection.insertOne(batchCodes);
      res.json(result);
    });

    // post batchcode
    app.post("/attendStudents", async (req, res) => {
      const attendStudents = req.body;
      const result = await presentCollection.insertOne(attendStudents);
      res.json(result);
    });

    // courses batchcode
    app.post("/courses", async (req, res) => {
      const curses = req.body;
      const result = await coursesCollection.insertOne(curses);
      res.json(result);
    });

    // courses batchcode
    app.post("/individualAttend", async (req, res) => {
      const curses = req.body;
      const result = await individualAttendCollection.insertOne(curses);
      res.json(result);
    });

    // ++++++++++++++++++++++
    // +++++++ get ++++++++++
    // ++++++++++++++++++++++

    // get students
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });
    // get batch
    app.get("/batch", async (req, res) => {
      const cursor = batchCodeCollection.find({});
      const batches = await cursor.toArray();
      res.send(batches);
    });

    // course batch
    app.get("/courses", async (req, res) => {
      const cursor = coursesCollection.find({});
      const courses = await cursor.toArray();
      res.send(courses);
    });

    // attend studens list
    app.get("/attendStudents", async (req, res) => {
      const cursor = presentCollection.find({});
      const attends = await cursor.toArray();
      res.send(attends);
    });
    // attend studens list
    app.get("/individualAttend", async (req, res) => {
      const cursor = individualAttendCollection.find({});
      const indiAttends = await cursor.toArray();
      res.send(indiAttends);
    });
    // account/users studens list
    app.get("/individualAttend", async (req, res) => {
      const cursor = individualAttendCollection.find({});
      const indiAttends = await cursor.toArray();
      res.send(indiAttends);
    });

    // get single batches
    app.get("/batch/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const blog = await batchCodeCollection.findOne(query);
      res.send(blog);
    });

    // get single user
    // app.get("/users/:mail", async (req, res) => {
    //   const user_mail = req.params.mail;
    //   const query = { email: user_mail };
    //   const user = await usersCollection.findOne(query);
    //   console.log(user_mail);
    //   res.send(user);
    // });

    app.get("/users/:mail", async (req, res) => {
      try {
        const user_mail = req.params.mail;
        const query = { email: user_mail };
        const user = await usersCollection.findOne(query);

        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ==================== attendance end =====================
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // get blogs
    app.get("/blogs", async (req, res) => {
      const cursor = blogCollection.find({});
      const blogs = await cursor.toArray();
      res.send(blogs);
    });

    // get single blogs
    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const blog = await blogCollection.findOne(query);
      res.send(blog);
    });

    // post blog
    app.post("/blogs", async (req, res) => {
      const blog = req.body;
      const result = await blogCollection.insertOne(blog);
      res.json(result);
    });

    // update blog
    app.put("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const blog = req.body;
      option = { upsert: true };
      updatedBlog = {
        $set: {
          name: blog.name,
          summary: blog.summary,
          content: blog.content,
        },
      };
      const result = await blogCollection.updateOne(
        filter,
        updatedBlog,
        option
      );
      res.json(result);
    });

    // delete a blog
    app.delete("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello...");
});

app.listen(port, () => {
  console.log(`Listening ${port}`);
});
