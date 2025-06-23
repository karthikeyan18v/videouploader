// strmly-backend/src/controllers/auth.controller.js
const Joi    = require('joi');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

const signupSchema = Joi.object({
  name:     Joi.string().required(),
  email:    Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = await signupSchema.validateAsync(req.body);
    if (await User.findOne({ email }))
      return res.status(400).json({ error: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);
    const user = await new User({ name, email, password: hash }).save();
    res.status(201).json({ id: user._id, name, email });
  } catch (err) { next(err); }
};

const loginSchema = Joi.object({
  email:    Joi.string().email().required(),
  password: Joi.string().required(),
});
exports.login = async (req, res, next) => {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    if (!await bcrypt.compare(password, user.password))
      return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token });
  } catch (err) { next(err); }
};

exports.profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) { next(err); }
};
