const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    FatherName: {
        type: String,
        required: [true, "Father's Name is required"],
        trim: true
    },
    rollNo: {
        type: String,
        required: [true, "Roll Number is required"],
        // unique: true,
        // match: [/^[A-Za-z0-9]+$/, "Roll number must be alphanumeric"]
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'Male', 'Female'],
        required: [true, "Gender is required"]
    },
    courseName: {
        type: String,
        required: [true, "Course Name is required"],
        trim: true
    },
    enrollmentDate: {
        type: Date,
        required: [true, "Enrollment Date is required"], //validator
    },
    trainingPeriod: {
        type: String,
        enum: ['6 months', '45 days', '21 days', '30 days'],
        required: [true, "Training Period is required"],
        match: [/^\d+\s(days|months)$/, "Training period must be in 'X months' or 'X days' format"]
    },
    collegeName: {
        type: String,
        required: [true, "college Name is required"],
        trim: true
    },
    collegeLocation: {
        type: String,
        required: [true, "College Location is required"],
        trim: true
    },
    // collegeName: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'College',
    //     required: true
    // },
    
    ReferenceNo: {
        type: String,
        required: [true, "Reference Number is required"],
        unique: true,
        // match: [/^REF\d{8}$/, "Reference Number must start with 'REF' followed by 8 digits"]
    },

}, { timestamps: true });


letterSchema.index({ name: 'text', FatherName: 'text' });
letterSchema.index({ courseName: 'text' });


module.exports = mongoose.model('Letter', letterSchema);

