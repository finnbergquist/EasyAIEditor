import React, { useEffect, useState } from 'react';
import ImageSelector from './ImageSelector/ImageSelector';
import DataUploader from './DataUploader/DataUploader';
import ImageEditor from './ImageEditor/ImageEditor';
import NewsletterSelectorType from './NewsletterSelectorType/NewsletterSelectorType';
import { submitForm, getForm } from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { Loader } from 'lucide-react';

function Form({ setForm, form, user, setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    const fetchForm = async () => {
      if (id) {
        try {
          console.log("Fetching form");
          const data = await getForm(id);
          setForm(data.data);
        } catch (error) {
          if (error.message === 'Unauthorized') {
            navigate('/login');
          }
          console.error('Error:', error);
        } finally {
          setLoading(false); // Set loading to false after the fetch is complete
        }
      } else {
        setLoading(false); // No ID provided, set loading to false
      }
    };

    fetchForm();
  }, [id, setForm, navigate]);

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader size={64} />
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-none'>
        <Header 
          user={user}
          setUser={setUser} 
        /> 
      </div>

      <div className='flex-1 overflow-hidden'>
        <ImageEditor 
          setForm={setForm}
          form={form}
          id={id}
          user={user}
          setUser={setUser}
        />
      </div>
    </div>
  );
}

export default Form;
