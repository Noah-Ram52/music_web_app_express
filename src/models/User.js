const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 4
  }
}, { 
  timestamps: true 
});

// Implemennt findUserByCredentials static method
// Look in WTWR project for reference
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(new Error('Invalid email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return Promise.reject(new Error('Invalid email or password'));
          }
          return user;
        });
    });
};

// Hash password before saving
userSchema.pre('save', async function hashPasswprd() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
  
});

module.exports = mongoose.model('User', userSchema);
