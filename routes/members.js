const express=require('express');
const router=express.Router();
const memberController=require('../controllers/memberController');

router.get('/', memberController.getMembers);
router.post('/members', memberController.addMember);
router.post('/members/edit/:id', memberController.editMember);
router.post('/members/delete/:id', memberController.deleteMember);
module.exports = router;
