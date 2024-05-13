const baseUrl = process.env.REACT_APP_API_URL;
const axios = require('axios');

export const submitForm = async (form, userId) => {
  try {
    const response = await fetch(`${baseUrl}/form/${userId}`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateForm = async (form, id) => {
  try {
    const response = await fetch(`${baseUrl}/form/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export const getForm = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/form/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteForm = async (id) => {
  console.log("Id to delete: ", id)
  try {
    const response = await fetch(`${baseUrl}/form/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await response.json();
  } catch (error) {
    console.log('Error:', error);
  }
};

export const getUserForms = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/form/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export const submitUser = async (user) => {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export const getUser = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export const authenticateUser = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}/users/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}  

export const uploadFile = async (file) => {
  try {
    const response = await fetch(`${baseUrl}/image/get-presigned-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename: file.name, filetype: file.type }),
    });

    const data = await response.json();

    console.log('Presigned URL:', data);

    const uploadResponse = await fetch(data.url, {
      method: 'PUT',
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error('Error uploading file');
    }

    const accessUrl = `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${data.key}`;
    return { url: accessUrl, status: "success" };
  } catch (error) {
    console.error('Error:', error);
  }
}