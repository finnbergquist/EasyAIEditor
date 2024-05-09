import { Edit2, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { getUserForms, deleteForm, getForm } from "../../../api/api";
import { useNavigate } from "react-router-dom";

const Gallery = ({user}) => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getUserForms(user.user_id);//Change to the userid
        setForms(response);
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };
    fetchImages();
  }, []);

  const editForm = (formId) => {
    navigate(`/form/${formId}`);
    
  }

  return (
    <main className="p-4">
        <header className="mb-4">
        <h1 className="text-left text-xl">Your Designs</h1>
        <hr />
      </header>
      <div className="grid grid-cols-4 gap-4">
        {Array.isArray(forms) && forms.map((form, index) => (
          <div key={index} className="relative group">
            <img
              src={form?.data?.selectedImage}
              alt={`Gallery Image ${index + 1}`}
              className="w-full"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-40 flex justify-between items-center px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <button
                aria-label={`Edit Image ${index + 1}`}
                className="text-white"
                onClick={() => {
                  editForm(form.form_id);
                }}
              >
                <Edit2 />
              </button>
              <button
                aria-label={`Delete Image ${index + 1}`}
                className="text-white"
                onClick={() => {
                  deleteForm(form.form_id);
                  setForms(forms.filter((f) => f.form_id !== form.form_id));
                }}
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Gallery;