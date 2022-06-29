const path = require("path");
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// Connect to database
connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

// Serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));

//   app.get("*", (_, res) => {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
//   });
// } else {
//   app.get("/", (req, res) => res.send("Please set environment to production"));
// }

// app.use(express.static("public"));

app.use(express.static(path.resolve(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public", "index.html"));
// });

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, console.log(`Server running on port ${port}`));
