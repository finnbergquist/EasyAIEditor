import React, { useEffect, useState } from 'react';
import ImageSelector from './ImageSelector/ImageSelector';
import DataUploader from './DataUploader/DataUploader';
import ImageEditor from './ImageEditor/ImageEditor';
import NewsletterSelectorType from './NewsletterSelectorType/NewsletterSelectorType';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { submitForm, getForm, updateForm } from '../../api/api';
import { useParams,useNavigate } from 'react-router-dom'
import Header from '../Header/Header';

function Form({setForm, form}) {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getForm(id)
        .then(data => {
          setForm(data.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, []);
  const navigate = useNavigate();
      
  const [expandedSection, setExpandedSection] = useState(1);
  const toggleSection = sectionNumber => {
    setExpandedSection(sectionNumber);
  };

  const handleNextClick = () => {
    if (expandedSection < 3) {
      setExpandedSection(expandedSection + 1);
    }
  };

  const handleBackClick = () => {
    if (expandedSection > 1) {
      setExpandedSection(expandedSection - 1);
    } else {
      navigate('/dashboard')
    }
  };

  const handleSaveClick = () => {
    updateForm(form, id)
      .then(data => {
        setForm(data.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className='flex flex-col h-screen'>
        <div className='flex-none'>
          <Header /> 
        </div>

        <div className='flex-1 overflow-hidden'>
            {expandedSection === 1 && (
                <ImageEditor 
                  setForm = {setForm}
                  form = {form}
                />
            )}
            {expandedSection === 2 && (
                <ImageSelector 
                  setForm = {setForm} 
                  form = {form} 
                />
            )}

            {expandedSection === 3 && (
                <DataUploader 
                  setForm = {setForm} 
                  form = {form} 
                />
            )}
        </div>
        {/* <div className='p-2 flex-none'>
            <div className='flex justify-between items-center'>
                <button onClick={handleBackClick} className='flex items-center bg-white hover:bg-gray-200 p-2 hover:shadow-lg'>
                    <ChevronLeft size={36} />
                    <span className='ml-2'>Back</span>
                </button>
                <div className='mx-auto text-center'>
                    {form.prompt}
                </div>
                <button onClick={handleNextClick} className='flex items-center bg-white hover:bg-gray-200 p-2 hover:shadow-lg'>
                    <ChevronRight size={36} />
                    <span className='ml-2'>Next</span>
                </button>
            </div>
        </div> */}
    </div>
);
}

export default Form;