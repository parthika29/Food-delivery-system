import React, { useState } from 'react';
import axios from 'axios';

const MenuUploadForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }
      formData.append('image', image);

      await axios.post('/api/menu', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('Menu item added!');
      setForm({ title: '', description: '', price: '', category: '' });
      setImage(null);
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add Menu Item</h2>
      <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input type="file" accept="image/*" onChange={handleImageChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default MenuUploadForm;
