const mongoose = require('mongoose');

const employee_schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, `Please enter employee's first name`],
        trim: true,
        maxlength: [20, 'Name cannot exceed 20 characters.']
    },
    second_name: {
        type: String,
        required: [true, `Please enter employee's second name`],
        trim: true,
        maxlength: [20, 'Name cannot exceed 20 characters.']
    },
    employee_id: {
        type: String,
        required: [true, `Please enter employee's ID`],
        trim: true,
        maxlength: [8, 'ID number cannot exceed 8 characters.'],
        minlength: [8, 'ID number must be exactly 8 characters.']
    },
    national_id: {
        type: String, // Changed to String to handle leading zeros or alphanumeric IDs
        required: [true, `Please enter employee's national ID`],
        minlength: [8, 'National ID must be exactly 8 digits.'],
        maxlength: [8, 'National ID cannot exceed 8 digits.'],
    },
    role: {
        type: String,
        required: [true, `Please enter employee's role`]
    },
    bank_account_number: {
        type: String, // Changed to String to handle account numbers with leading zeros
    },
    bank_name: {
        type: String,
        required: [true, `Please enter the name of the bank`]
    }
});

module.exports = mongoose.model('Employee', employee_schema);
