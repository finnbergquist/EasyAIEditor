import React, { useState } from "react";
function NewsletterPreferenceDropdown({ form, setForm }) {  
  const formOfDelivery = form.formOfDelivery;

  const handleChange = (event) => {
    setForm({
        ...form,
        formOfDelivery: event.target.value
    });
  };
  return (
    <div
      className="bg-white p-4 rounded-md shadow-md w-64 mx-auto mt-10" >
      <form>
        <label
          htmlFor="newsletter-method"
          className="block mb-2 text-lg font-medium" >
          Choose newsletter delivery method:
        </label>
        <select
          name="newsletter-method"
          id="newsletter-method"
          value={formOfDelivery}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          aria-label="Select newsletter delivery method" >
          <option value="email">
            Email
          </option>
          <option value="text">
            Text Message
          </option>
          <option value="integration">
            Integration
          </option>
        </select>
      </form>
    </div>
  );
}
export default NewsletterPreferenceDropdown;

