import React, { useState } from 'react';
import Prompter from './Prompter/Prompter.js';
import Gallery from './Gallery/Gallery.js';
import { submitForm } from "../../api/api.js";
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ form, setForm, user }) => {
  const navigate = useNavigate();
  const handleUpdateForm = (newForm) => {
    setForm(newForm);
  }
  const [loading, setLoading] = useState(false)

  const generateImages = (form) => {
    setForm({
      ...form,
      images: ["loading", "loading", "loading"]
    });
    setLoading(true)
    
    submitForm(form, user.user_id)
      .then(data => {
        console.log('Success:', data);
        setForm(data.data);
        setLoading(false)
        navigate(`/form/${data.form_id}`);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error as needed
      });
    ;


  }

  return (
    <div>
      <div className={`pt-4 flex flex-col items-center justify-center w-1/2 mx-auto  bg-white rounded shadow-lg`}>
        <Prompter 
          form={form} 
          handleUpdateForm={handleUpdateForm} 
          generateImages={generateImages}
          loading={loading}
        />
      </div>
      <div className="p-36">
        <Gallery
          user={user}
          />
      </div>
    </div>
  );
}

export default Dashboard;