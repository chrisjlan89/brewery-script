const parallel = (tasks, fn) => {
  return Promise.all(tasks.map((task) => fn(task)));
};

module.exports = { parallel };
