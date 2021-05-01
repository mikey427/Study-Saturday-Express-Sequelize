const router = require('express').Router();
const Student = require('../db/models/student');

// GET /students/

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (error) {
    next(error);
  }
});

// GET /students/id
router.get('/:id', async (req, res, next) => {
  try {
    const studentByID = await Student.findByPk(req.params.id);
    if (studentByID) {
      res.send(studentByID);
    } else {
      res.status(404).send('Student not found!');
    }
  } catch (error) {
    next(404);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).send(newStudent);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let updatedStudent = await Student.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    });
    res.send(updatedStudent[1]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Student.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// router.use(function (req, res) {
//   res.sendStatus(404);
// });

module.exports = router;
