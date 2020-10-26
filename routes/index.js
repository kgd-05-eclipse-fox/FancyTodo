const router = require('express').Router();
const Controller = require('../controllers/controller')



router.get('/todos', Controller.findAll);
router.patch('/todos/:id', Controller.editAll)




module.exports = router;