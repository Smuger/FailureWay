import Product from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

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

  const userExist = await User.findOne({ email });

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
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      messageBank: user.messageBank,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const postUserMessage = asyncHandler(async (req, res) => {
  const { recipient, message } = req.body;

  console.log("Server recived: " + recipient + " " + message);

  // Sender db object
  const user = await User.findOne(req.user._id);

  console.log(user);
  console.log("user found");
  // Reciepient db object
  const user2 = await User.findById(recipient);

  console.log(user2);
  console.log("recipient found");

  console.log("USERS FOUND");

  // Sender Array message
  const messageArray = {
    recipient: recipient,
    sender: req.user._id,
    message: message,
  };

  console.log("ARRAY MESSAGE DONE");

  // Sender Conversation
  let conversations = {
    recipient: recipient,
    messagesForThatUser: [messageArray],
  };

  // Reciepient Conversation
  let conversations2 = {
    recipient: req.user._id,
    messagesForThatUser: [messageArray],
  };

  console.log("CONVERSATIONS DONE");

  updateMessageDBs(user, recipient, message, conversations, messageArray);
  console.log("FIST FUNCTION DONE");
  updateMessageDBs(user2, req.user._id, message, conversations2, messageArray);
  console.log("SECOND FUNCTION DONE");

  try {
    await user.save();
    await user2.save();
    console.log("Message saved");
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
  console.log(user.messageBank.length);
  if (user.messageBank.length > 0) {
    for (let i = 0; i < user.messageBank.length; i++) {
      console.log(user.messageBank[i].recipient);
      console.log(recipient);
      if (user.messageBank[i].recipient.equals(recipient)) {
        console.log("Conversation found");
        conversationPosition = i;
        break;
      }
    }
    if (conversationPosition !== null) {
      console.log("Converstation already exist.");
      user.messageBank[conversationPosition].messagesForThatUser.push(
        messageArray
      );
      console.log("Pushed");
    } else {
      user.messageBank.push(conversations);
    }
  } else {
    user.messageBank.push(conversations);
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
