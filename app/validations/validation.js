import { body } from 'express-validator';

// Auth validations
export const signupValidation = [
  body('email', 'Email is wrong...').isEmail(),
  body('password', 'Password length min 5 characters').isLength({ min: 5 }),
  body('fullName', 'Full name min 3 characters').isLength({ min: 5 }),
  body('avatarUrl', 'Avatar url is wrong...').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Email is wrong...').isEmail(),
  body('password', 'Password length min 5 characters').isLength({ min: 5 }),
];
// Post validation
export const postCreateValidation = [
  body('title', 'Enter article title...').isLength({ min: 3 }).isString(),
  body('text', 'Enter aticle text...').isLength({ min: 10 }).isString(),
  body('tags', 'Tags format wrong...').optional().isString(),
  body('imageUrl', 'Image url is wrong...').optional().isString(),
];
