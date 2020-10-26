const router = require('express').Router();
const Controller = require('../controllers/controller')


router.post('/todos', Controller.postTodo);

router.get('/todos', Controller.findAll);

router.put('/todos/:id', Controller.putEditTodo);

router.patch('/todos/:id', Controller.patchIdTodo);

router.delete('/todos/:id', Controller.deleteById);



module.exports = router;