const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

// GET // all
router.get('/', async (req, res, next) => {
  try {
    let tests = await Test.findAll();
    res.send(tests);
  } catch (error) {
    next(error);
  }
});

// GET // by ID
router.get('/:id', async (req, res, next) => {
  try {
    let test = await Test.findByPk(req.params.id);
    res.send(test);
  } catch (error) {
    next(error);
  }
});

// POST // Create
router.post('/student/:id', async (req, res, next) => {
  try {
    let student = await Student.findByPk(req.params.id);
    let test = await Test.create(req.body);
    let studentTest = await test.setStudent(student);
    res.status(201).send(studentTest);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Test.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
