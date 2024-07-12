const baseUrl = process.env.REACT_APP_API_URL;

export const submitForm = async (form, userId) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const user = localStorage.getItem('user');
  if (user?.data?.openAPIKey) {
    form.userAPIKey = user.data.openAPIKey;
  }

  try {
    const response = await fetch(`${baseUrl}/form/${userId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(form),
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateForm = async (form, id) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  const user = JSON.parse(localStorage.getItem('user'));
  if (user.data?.openAPIKey) {
    form.userAPIKey = user.data.openAPIKey;
  }
  try {
    const response = await fetch(`${baseUrl}/form/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(form),
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
};

export const getForm = async (id) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await fetch(`${baseUrl}/form/${id}`, {
      method: 'GET',
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteForm = async (id) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await fetch(`${baseUrl}/form/${id}`, {
      method: 'DELETE',
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getUserForms = async (userId) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await fetch(`${baseUrl}/form/user/${userId}`, {
      method: 'GET',
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const submitUser = async (user) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getUser = async (id) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: 'GET',
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateUser = async (user) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await fetch(`${baseUrl}/users/${user.user_id}`, {
      method: 'PUT',
      body: JSON.stringify({user}),
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};


export const authenticateUser = async (email, password='', temporaryPassword='') => {
  try {
    const response = await fetch(`${baseUrl}/users/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, temporaryPassword }),
    });

    const data = await response.json();

    // Store the token in localStorage
    if (data.isAuthenticated){
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const uploadFile = async (file) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await fetch(`${baseUrl}/image/get-presigned-url`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ filename: file.name, filetype: file.type }),
    });

    const data = await response.json();

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
};

export const verifyUser = async (email) => {
  try {
    const response = await fetch(`${baseUrl}/users/verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}