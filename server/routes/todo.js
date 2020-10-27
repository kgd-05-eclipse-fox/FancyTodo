const router = require('express').Router();
const Controller = require('../controllers/todo-controller')

router.post('/', Controller.postTodo);

router.get('/', Controller.findAll);

router.put('/:id', Controller.putEditTodo);

router.patch('/:id', Controller.patchIdTodo);

router.delete('/:id', Controller.deleteById);

module.exports = router;

