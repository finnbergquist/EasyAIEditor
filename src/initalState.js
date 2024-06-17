// initialState.js
export const initialState = {
    //Default Values for ANY form
    form: {
      name: "Form Name",
      prompt: "",
      images: [],
      selectedImage: "",
    },

    //data about the currently logged in user
    user: { 
      user_id: 0,
      email: "",
      password: "",
      data: {
        forms: [],
        name: "",
        freeAPIRequests: 2,
        openAIKey: false,
      },
    }
  };