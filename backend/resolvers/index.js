const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

module.exports = {
  Query: {
    getEmployees: async () => {
      return await Employee.find().sort({ createdAt: -1 });
    },

    getEmployee: async (_, { id }) => {
      return await Employee.findById(id);
    },

    searchEmployees: async (_, { department, position }) => {
      const filter = {};

      if (department) {
        filter.department = { $regex: department, $options: 'i' };
      }

      if (position) {
        filter.position = { $regex: position, $options: 'i' };
      }

      return await Employee.find(filter);
    }
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashedPassword
      });

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return {
        token,
        user
      };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return {
        token,
        user
      };
    },

    addEmployee: async (_, args) => {
      const employee = await Employee.create(args);
      return employee;
    },

    updateEmployee: async (_, { id, ...rest }) => {
      return await Employee.findByIdAndUpdate(id, rest, { new: true });
    },

    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return 'Employee deleted successfully';
    }
  }
};