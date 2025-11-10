const express = require("express");

const healthcheckRoutes = require("./routes/healthcheck.route");
const userRoutes = require("./routes/user.route");
const usersRoutes = require("./routes/users.route");
const categoryRoutes = require("./routes/category.route");
const recordRoutes = require("./routes/record.route");
const incomeRoutes = require("./routes/income.routes");
const accountRoutes = require("./routes/account.routes");

const app = express();

app.use(express.json());

app.use("/healthcheck", healthcheckRoutes);

app.use("/user", userRoutes);
app.use("/users", usersRoutes);
app.use("/category", categoryRoutes);
app.use("/record", recordRoutes);
app.use("/incomes", incomeRoutes);
app.use("/accounts", accountRoutes);

module.exports = app;
