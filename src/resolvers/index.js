import { Query } from "mongoose";
import User from "../models/User.js";

const resolvers = {
  Query: {
    getUser: async (_, { email }) => {
      return await User.findOne({ email });
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const user = new User({ name, email, password });
      await user.save();
      return user;
    },
  },
};

export default resolvers;
