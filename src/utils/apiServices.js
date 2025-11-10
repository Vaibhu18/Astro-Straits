import axios from "axios";

export const signupUser = async (name, email, password) => {
    try {
        const resp = await axios.post("/api/auth/signup", { name, email, password });
        return resp.data;
    } catch (error) {
        return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred", };
    }
}

export const signinUser = async (email, password) => {
    try {
        const resp = await axios.post("/api/auth/signin", { email, password });
        return resp.data;
    } catch (error) {
        return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred", };
    }
}

export const getAuthUser = async () => {
    try {
        const resp = await axios.get("/api/auth/user");
        return resp.data;
    } catch (error) {
        return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred", };
    }
};

export const createNewChat = async (userId) => {
    try {
        const resp = await axios.post(`/api/chat/new-chat/${userId}`);
        return resp.data;
    } catch (error) {
        return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred" };
    }
}

export const generateResponse = async (chatId, data) => {
    try {
        const resp = await axios.post(`/api/message/ai-message/${chatId}`, data);
        return resp.data;
    } catch (error) {
        return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred" };
    }
}

export const getChatByUserId = async (userId) => {
    try {
        const resp = await axios.get(`/api/chat/get-chat/${userId}`);
        return resp.data;
    } catch (error) {
        return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred" };
    }
}

export const getMessagesByChatId = async (chatId) => {
    try {
        const resp = await axios.get(`/api/message/all-messages/${chatId}`);
        return resp.data;
    } catch (error) {
        return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred" };
    }
}

export const performOnbording = async (userId, data) => {
    try {
        const resp = await axios.put(`/api/auth/onbording/${userId}`, data);
        return resp.data;
    } catch (error) {
        return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred" };
    }
}

// export const createNewChat = async (userId, prompt, model) => {
//     try {
//         const resp = await axios.post("/api/chat/create-chat", { userId, prompt, model });
//         return resp.data;
//     } catch (error) {
//         return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred", };
//     }
// }

// export const performOnbording = async (userId, data) => {
//     try {
//         const resp = await axios.post(`/ api / auth / onbording / ${ userId } `, data);
//         return resp.data;
//     } catch (error) {
//         return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred" };
//     }
// }



// export const createUserMessage = async (userId, chatId, prompt) => {
//     try {
//         const resp = await axios.post(`/ api / message / create - user`, { userId, chatId, prompt });
//         return resp.data;
//     } catch (error) {
//         return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred" };
//     }
// }

// export const getBraveResources = async (userId, messageId, prompt) => {
//     try {
//         const resp = await axios.post(`/ api / message / create - brave`, { userId, messageId, prompt });
//         return resp.data;
//     } catch (error) {
//         return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred" };
//     }
// }

// export const createAIMessage = async (userId, chatId, prompt, model) => {
//     try {
//         const resp = await axios.post(`/ api / message / create - ai`, { userId, chatId, prompt, model });
//         return resp.data;
//     } catch (error) {
//         return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred" };
//     }
// }


// export const updateAPIKeys = async (userId, geminiAPIKey, braveAPIKey) => {
//     try {
//         const resp = await axios.post("/api/auth/update-api-key", { userId, geminiAPIKey, braveAPIKey });
//         return resp.data;
//     } catch (error) {
//         return { success: false, message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred" };
//     }
// }