import { body } from 'express-validator';

export const signupValidation = [
  body('email', 'Email is wrong...').isEmail(),
  body('password', 'Password length min 5 characters').isLength({ min: 5 }),
  body('fullname', 'Full name min 3 characters').isLength({ min: 5 }),
  body('avatarUrl', 'Avatar url is wrong...').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Email is wrong...').isEmail(),
  body('password', 'Password length min 5 characters').isLength({ min: 5 }),
];

export const postCreateValidation = [
  body('title', 'Enter article title...').isLength({ min: 3 }).isString(),
  body('text', 'Enter aticle text...').isLength({ min: 10 }).isString(),
  body('tags', 'Tags format wrong...').optional().isArray(),
  body('imageUrl', 'Image url is wrong...').optional().isString(),
];