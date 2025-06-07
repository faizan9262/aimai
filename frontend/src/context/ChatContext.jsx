import { createContext, useContext, useEffect, useState } from "react";
import {
  deteleConvoOfUser,
  getAllConvoOfUser,
  getChatsOfConvoFoUser,
  newOrContinueChat,
} from "../helper/api-communication.js";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  const auth = useAuth();

  const [allConvo, setAllConvo] = useState({});
  const [currentConvoId, setCurrentConvoId] = useState("");
  const [messages, setMessages] = useState([]);
  const [convoId, setConvoId] = useState("");  
  const [loadingConvos, setLoadingConvos] = useState(true);

  useEffect(() => {
    if (auth.isLoggedIn) {
      const getAllConvo = async () => {
        setLoadingConvos(true);
        const data = await getAllConvoOfUser();
        console.log("All Conversation: ",data);
        const convo = data.conversations;
        if (convoId) {
          setCurrentConvoId(convoId);
          setAllConvo(
            convo.map((c) => {
              return {
                id: c.id,
                summary: c.summary,
                title: c.title,
                date: c.updatedAt,
              };
            })
          );
          setLoadingConvos(false);
        } else {
          setLoadingConvos(true);
          setCurrentConvoId(convo[0].id);
          setAllConvo(
            convo.map((c) => {
              return {
                id: c.id,
                summary: c.summary,
                title: c.title,
                date: c.updatedAt,
              };
            })
          );
          setLoadingConvos(false);
        }
      };
      getAllConvo();
    }
  }, [auth]);

  //   console.log("Current Convo Id: ",currentConvoId);

  useEffect(() => {
    // console.log("All Chats: ", allConvo);
  }, [allConvo]);

  const deleteConvo = async (conversationId) => {
    const data = await deteleConvoOfUser(conversationId);
  };

  const startOrContinueConvo = async (message, conversationId) => {
    const data = await newOrContinueChat(message, conversationId);
    const simplifiedMessages = data.messages.map(({ role, content }) => ({
      role,
      content,
    }));
    setMessages(simplifiedMessages);
    console.log(messages);
  };

  useEffect(() => {
    const fetchChats = async () => {
      if (!currentConvoId) return; // guard clause
      try {
        const data = await getChatsOfConvoFoUser(currentConvoId);
        const chat = data.chats;
        const simplifiedMessages = chat.map(({ role, content }) => ({
          role,
          content,
        }));
        setMessages(simplifiedMessages);
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };

    fetchChats();
  }, [currentConvoId]);


  useEffect(() => {
    console.log(
      "Chats of convo: ",
      messages[21]?.content ?? "No message at index 19"
    );
  }, [messages]);

  const value = {
    allConvo,
    deleteConvo,
    startOrContinueConvo,
    currentConvoId,
    messages,
    setMessages,
    setCurrentConvoId,
    setConvoId,
    loadingConvos
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
