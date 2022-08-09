import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import User from '../models/User.js';

// Registering user
export const signup = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      email: req.body.email,
      fullname: req.body.fullname,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretKey321',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Signup wrong...',
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Login wrong...' });
    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPassword) return res.status(404).json({ message: 'Login or password wrong...' });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretKey321',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Login wrong...',
    });
  }
};

// Get user info
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Access denide...' });
    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Access denide...',
    });
  }
};