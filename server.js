const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;
app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const coursesRoute = require("./routes/coursesRoute");
const registrationsRoute = require("./routes/registrationsRoute")

app.use("/api/users", usersRoute);
app.use("/api/courses", coursesRoute);
app.use("/api/registrations",registrationsRoute)



app.listen(port, () => console.log(`Node server listening on port ${port}!`));
