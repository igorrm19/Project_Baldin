const mongoose = require('mongoose');
import { USER_ROLES } from '../constants/user.constants.js';

const userSchelma = new mongoose(
    {
        name: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
        },
      
        email: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true,
        },
      
        password: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          enum: [USER_ROLES.USER, USER_ROLES.ADMIN],
          default: USER_ROLES.USER,
        },
      },
        { timestamps: true }
)

const User = mongoose.model('User', userSchelma);

export default User;
