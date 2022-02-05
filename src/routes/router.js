const express = require("express"),
  router = express.Router(),
  pgPromise = require("pg-promise")();

const config = {
  host: "localhost",
  port: 5432,
  database: "mv_todo_app",
  user: "matthewvolny",
  password: "Ronweasley1@@@",
};

const database = pgPromise(config);

router.get("/", async (req, res) => {
  try {
    const toDoTasks = await database.any(
      "SELECT * FROM tasks WHERE completed = false"
    );
    const completedTasks = await database.any(
      "SELECT * FROM tasks WHERE completed = true"
    );
    res.render("home", {
      toDoTasks: toDoTasks,
      completedTasks: completedTasks,
    });
  } catch (error) {
    console.log(error);
  }
});

//submit task form
router.post("/", async (req, res) => {
  console.log(req.body.task);
  try {
    let queryString = "INSERT INTO tasks (task) VALUES ($1)";
    await database.none(queryString, [req.body.task]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete", async (req, res) => {
  console.log(req.body.id); // 1
  try {
    let queryString = `DELETE FROM tasks WHERE id = $1`;
    await database.none(queryString, [req.body.id]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.post("/update", async (req, res) => {
  console.log(req.body.id); // 1
  try {
    let queryString = `UPDATE tasks SET completed = 'true' WHERE id = $1`;
    await database.none(queryString, [req.body.id]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.post("/return", async (req, res) => {
  console.log(req.body); // 1
  try {
    let queryString = `UPDATE tasks SET completed = 'false' WHERE id = $1`;
    await database.none(queryString, [req.body.id]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
