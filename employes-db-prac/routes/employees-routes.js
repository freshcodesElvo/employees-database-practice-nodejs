const express = require('express');
const router = express.Router()

const {get_all_employees, create_an_employee, get_a_spacific_employee, update_a_spacific_employee, delete_a_spacific_employee} = require('../controllers/employees');
router.route('/').get(get_all_employees).post(create_an_employee);
router.route('/:id').get(get_a_spacific_employee).patch(update_a_spacific_employee).delete(delete_a_spacific_employee);

module.exports = router;