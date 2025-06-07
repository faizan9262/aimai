import OpenAI from "openai";
import Chat from "../models/Chats.model.js";
import Conversation from "../models/Conversation.model.js";
import User from "../models/User.model.js";

export const generateChatComplition = async (req, res) => {
  const { message, conversationId } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    let conversation;

    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (
        !conversation ||
        conversation.user.toString() !== user._id.toString()
      ) {
        return res.status(403).json({ message: "Invalid conversation access" });
      }
    } else {
      conversation = await Conversation.create({ user: user._id });
    }

    const previousChats = await Chat.find({
      conversation: conversation._id,
    }).sort({ createdAt: 1 });

    const chatsForOpenAi = previousChats.map(({ role, content }) => ({
      role,
      content,
    }));
    chatsForOpenAi.push({ role: "user", content: message });

    const userMsg = await Chat.create({
      user: user._id,
      conversation: conversation._id,
      role: "user",
      content: message,
    });

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: chatsForOpenAi,
    });

    const aiMsg = await Chat.create({
      user: user._id,
      conversation: conversation._id,
      role: response.choices[0].message.role,
      content: response.choices[0].message.content,
    });

    return res.status(200).json({
      conversationId: conversation._id,
      messages: [...previousChats, userMsg, aiMsg],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getAllConversations = async (req, res) => {
  try {
    const userId = res.locals.jwtData.id;

    // Get all conversations of this user sorted by updatedAt desc
    const conversations = await Conversation.find({ user: userId }).sort({
      updatedAt: -1,
    });

    // For each conversation, fetch chats sorted by createdAt ascending
    const results = await Promise.all(
      conversations.map(async (conv) => {
        const chats = await Chat.find({ conversation: conv._id }).sort({
          createdAt: 1,
        });

        const firstUserMsg = chats.find((chat) => chat.role === 'user');

        let summary = 'No response yet';
        if (firstUserMsg) {
          const firstUserMsgIndex = chats.indexOf(firstUserMsg);
          for (let i = firstUserMsgIndex + 1; i < chats.length; i++) {
            if (chats[i].role !== 'user') {
              summary = chats[i].content;
              break;
            }
          }
        }

        return {
          id: conv._id,
          createdAt: conv.createdAt,
          updatedAt: conv.updatedAt,
          title: firstUserMsg ? firstUserMsg.content : 'No messages',
          summary,
        };
      })
    );

    return res.status(200).json({ conversations: results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to get conversations' });
  }
};



export const getConversationChats = async (req, res) => {
  try {
    const userId = res.locals.jwtData.id;
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation || conversation.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to conversation" });
    }

    const chats = await Chat.find({ conversation: conversationId }).sort({
      createdAt: 1,
    });

    return res.status(200).json({ chats });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to get conversation chats" });
  }
};

export const deleteConvo = async (req, res) => {
  try {
    const { conversationId } = req.body;

    if (!conversationId) {
      return res.status(400).json({ message: "Conversation ID is required" });
    }

    const deleted = await Conversation.findByIdAndDelete(conversationId);

    if (!deleted) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    return res.status(200).json({ message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Delete conversation error:", error);
    return res.status(500).json({ message: "Server error while deleting conversation" });
  }
};

