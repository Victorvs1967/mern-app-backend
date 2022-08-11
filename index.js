import express from "express";
import multer from 'multer';
import cors from 'cors';
import mongoose from "mongoose";

import { signupValidation, loginValidation, postCreateValidation } from './app/validations/validation.js';
import { UserController, PostController } from './app/controllers/index.js';
import { checkAuth, handleValidationErrors } from './app/utils/index.js';

mongoose.connect('mongodb://localhost:27017/mernDB')
  .then(() => console.log('DataBase Ok'))
  .catch(err => console.log('DataBase Error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.listen(8888, err => err ? console.log(err.message) : console.log('Server Ok.'));

app.post('/auth/signup', signupValidation, handleValidationErrors, UserController.signup);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => res.json({ url: `/uploads/${req.file.originalname}` }));

app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getPosts);
app.get('/posts/:id', PostController.getPost);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.put('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
app.delete('/posts/:id', checkAuth, PostController.remove);
