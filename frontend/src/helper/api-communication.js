import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/user/login", { email, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while Signing In");
    }
  }
};

export const signupUser = async (name,email, password) => {
  try {
    const response = await axios.post("/user/signup", {name, email, password});
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while  Signing Up");
    }
  }
};

export const authStatus = async () => {
  try {
    const response = await axios.get("/user/is-auth");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while Authentication");
    }
  }
};

export const sendVerifyEmailOtp = async () => {
  try {
    const response = await axios.get("/user/send-email-otp");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while sending email verification OTP");
    }
  }
};

export const verifyEmailOtp = async (otp) => {
  try {
    const response = await axios.post("/user/verify-email-otp",{otp});
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while Verifying Email verification OTP");
    }
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post("/user/logout");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while Log out");
    }
  }
};

export const sendPasswordResetMail = async (email) => {
  try {
    const response = await axios.post("/user/forgot-password",{email});
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while password reset link");
    }
  }
};

export const resetPassword = async (otp,newPassword,email) => {
  try {
    const response = await axios.post(`/user/reset-password`,{otp,newPassword,email});
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while password reset");
    }
  }
};

export const updatePassword = async (oldPassword,newPassword) => {
  try {
    const response = await axios.post(`/user/update-password`,{oldPassword,newPassword});
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while password update");
    }
  }
};

export const updateProfile = async (imageUrl) => {
  try {
    const response = await axios.post(`/user/update-profile-pic`,imageUrl);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while updating profile pic");
    }
  }
};



export const getAllConvoOfUser = async () =>{
  const response = await axios.get("/chat/conversations")
  if(response.status !== 200){
      throw  new Error("Unable to Load All conversation")
  }
  const data = await response.data
  return data
}

export const newOrContinueChat = async (message,conversationId) =>{
  try {
    const response = await axios.post("/chat/complete", { message, conversationId });
    return response.data;
  } catch (err) {
    console.error("API error:", err);
    throw new Error("Unable to load or continue conversation");
  }
}

export const getChatsOfConvoFoUser = async (conversationId) =>{
  const response = await axios.get(`/chat/${conversationId}`)
  if(response.status !== 200){
      throw  new Error("Unable to Load All conversation")
  }
  const data = await response.data
  return data
}

export const deteleConvoOfUser = async (conversationId) =>{
  const response = await axios.post("/chat/delete-conversation",{conversationId})
  if(response.status !== 200){
      throw  new Error("Unable to Load All conversation")
  }
  const data = await response.data
  return data
}