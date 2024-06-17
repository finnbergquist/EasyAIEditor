import React, { useState, useEffect } from 'react';
import Prompter from './Prompter/Prompter.js';
import Gallery from './Gallery/Gallery.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import ImageUploader from './ImageUploader/ImageUploader.js';
import { useNavigate } from 'react-router-dom';
import { initialState } from '../../initalState.js';

const Dashboard = ({ form, setForm, user, setUser }) => {
  const navigate = useNavigate();
  const handleUpdateForm = (newForm) => {
    setForm(newForm);
  }
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setForm(initialState.form);
  }, []);


  return (
    <div>
      <Header user={user} setUser={setUser}/>
      <div className="mt-4 px-36 py-8">

        <ImageUploader form={form} setForm={setForm} user={user} setUser={setUser} />

      </div>

      <div className="p-36">
        <Gallery user={user} />
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;