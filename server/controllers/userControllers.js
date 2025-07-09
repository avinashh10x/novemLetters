const User = require('../model/User.model');

const jwt = require('jsonwebtoken')


const hello = async (req, res) => {
    res.send('this is letter route ');
}


const userRegistration = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const newUser = new User({ name, email, password });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', token })


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error from controler', error })
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: 'User logged in successfully', token })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' })
    }
}

module.exports = {
    userRegistration,
    userLogin,
    hello
}