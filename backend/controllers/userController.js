import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// I cant use require natively from ESM
//import { createRequire } from "module";
//import express from "express";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email }).lean();

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      reportsFromThatUser: user.reportsFromThatUser,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get user profile
// @route GET /api/users/messages
// @access PRIVATE
const getUserMessages = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select({ messageBank: 1 })
    .lean();
  if (!user.hasOwnProperty("messageBank")) {
    user.messageBank = [];
  }

  if (user) {
    res.json({ user });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Post new message
// @route POST /api/users
// @access Public
const postUserMessage = asyncHandler(async (req, res) => {
  const { recipient, message } = req.body;

  // Sender db object
  const user = await User.findOne(req.user._id);

  // Reciepient db object
  const user2 = await User.findById(recipient);

  // Sender Array message
  const messageArray = {
    recipient: recipient,
    sender: req.user._id,
    message: message,
  };

  // Sender Conversation
  let conversations = {
    recipient: recipient,
    messagesForThatUser: [messageArray],
    recipientName: user2.name,
  };

  // Reciepient Conversation
  let conversations2 = {
    recipient: req.user._id,
    messagesForThatUser: [messageArray],
    recipientName: req.user.name,
  };

  updateMessageDBs(user, recipient, message, conversations, messageArray);

  updateMessageDBs(user2, req.user._id, message, conversations2, messageArray);

  try {
    await user.save();

    if (recipient.str === req.user._id.str) {
    } else {
      await user2.save();
    }

    res.status(201).json({ message: "Message sent" });
  } catch (error) {
    console.error("Unable to send message: " + error);
    res.status(404);
    throw new Error("Service not found");
  }
});

const updateMessageDBs = (
  user,
  recipient,
  message,
  conversations,
  messageArray
) => {
  let conversationPosition = null;

  if (user.messageBank.length > 0) {
    for (let i = 0; i < user.messageBank.length; i++) {
      if (user.messageBank[i].recipient.equals(recipient)) {
        conversationPosition = i;
        break;
      }
    }
    if (conversationPosition !== null) {
      user.messageBank[conversationPosition].messagesForThatUser.push(
        messageArray
      );
      let updatedMessageBank = user.messageBank[conversationPosition];
      user.messageBank.splice(conversationPosition, 1);
      user.messageBank.unshift(updatedMessageBank);
    } else {
      user.messageBank.unshift(conversations);
    }
  } else {
    user.messageBank.unshift(conversations);
  }
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });

    //res.json;
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserMessages,
  postUserMessage,
};
