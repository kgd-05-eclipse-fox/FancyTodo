const router = require('express').Router();
const Controller = require('../controllers/todo-controller')
const {authentication} = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');


router.use(authentication)

router.post('/', Controller.postTodo);

router.get('/', Controller.findAll);

router.get('/:id', Controller.getById)

router.put('/:id', authorization, Controller.putEditTodo);

router.patch('/:id', authorization, Controller.patchIdTodo);

router.delete('/:id', authorization, Controller.deleteById);

module.exports = router;

