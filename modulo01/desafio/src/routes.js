const express = require('express');
const routes = new express.Router();

const projects = [
  { id: 0, title: 'Test', tasks: [{ id: 0, title: 'task test' }] }
];

function checkIfProjectExists(req, res, next) {
  const { projectId } = req.params;

  const projectIndex = projects.findIndex(f => f.id === parseInt(projectId));

  if (projectIndex < 0) {
    return res.status(400).send('Project not found');
  }

  req.projectIndex = projectIndex;

  return next();
}

routes.get('/projects', (req, res) => res.json(projects));

routes.post('/projects', (req, res) => {
  const { title } = req.body;

  let maxId = projects.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );

  projects.push({ id: ++maxId, title, tasks: [] });

  return res.json(projects);
});

routes.put('/projects/:projectId', checkIfProjectExists, (req, res) => {
  const { title } = req.body;

  projects[req.projectIndex].title = title;

  return res.json(projects);
});

routes.delete('/projects/:projectId', checkIfProjectExists, (req, res) => {
  projects.splice(req.projectIndex, 1);

  return res.send();
});

routes.post('/projects/:projectid/tasks', checkIfProjectExists, (req, res) => {
  const { title } = req.body;

  let maxId = projects[req.projectIndex].tasks.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );

  projects[req.projectIndex].tasks.push({ id: ++maxId, title });

  return res.json(projects[req.projectIndex]);
});

module.exports = routes;
