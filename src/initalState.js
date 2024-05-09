// initialState.js
export const initialState = {
    //Default Values for ANY form
    form: {
      id: 6,
      name: "User Profile Form",
      customerDataValues: ["visits", "hours spent", "purchases"],
      prompt: "Example Prompt for the AI",
      images: ["loading", "loading", "loading"],
      selectedImage: 0,
      step: 0,
      formOfDelivery: "email",
    },

    //data about the currently logged in user
    user: { 
      user_id: 0,
      email: "",
      password: "",
      data: {
        forms: [],
        name: "",
      },
    }
  };