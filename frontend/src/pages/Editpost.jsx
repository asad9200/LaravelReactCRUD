
import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router";
import { useState } from 'react';
import api from '../api/api';
import { useParams } from 'react-router';

export default function Editpost() {

  const {id}= useParams();
  const [issubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState();
  const navigate=useNavigate();

  useEffect(()=>{ 
    getPostbyid();
  },[]);

  const getPostbyid= async()=>{
    const response= await api.get(`/post-by-id/${id}`);
    setFormData({
      'title': response.data.title || "",
      'author': response.data.author || "",
      'category': response.data.category || "",
      'status': response.data.status || "",
      'content': response.data.content || "",
      id: id,
    });
  }

    


  const [formData, setFormData] = useState({
    'title': "",
    'author': "",
    'category': "",
    'status': "",
    'content': "",

  });

  const handleChange = (e) => {
    //Handle
    const {name,value} =e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };


  const handleSubmit = async (e) => {
    // Handle form submission logic here
    e.preventDefault();
    console.log(formData);
    setIsSubmitting(true);
    try{
      const response = await api.post('/edit-post',formData);
      navigate('/');

    } catch (error){

      //Here the if statement is not working properly.


        if(error.response && error.response.status===422){
          setErrors(error.response.data.message);

        }else{
          
          setErrors('Something went wrong. Please try again later.');
        }
      

    } finally{
      setIsSubmitting(false);
    }

  };

  return (
    <div>
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="display-4">Create New Post</h1>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  Create New Post
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {errors &&
        <div className='alert alert-danger'>{errors}</div>
        }

        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Post Details</h5>
          </div>

          <div className="card-body">
            <form id="post-form" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label for="title" className="form-label">Title</label>
                <input type="text" name="title" onChange={handleChange} value={formData.title} className="form-control" id="title" />
              </div>

              <div className="col-md-6">
                <label for="author">Author</label>
                <input type="text" name="author" onChange={handleChange} value={formData.author} className="form-control" id="author" />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="category" className="form-label">Category</label>
                  <select className="form-select" name="category" onChange={handleChange} value={formData.category} id="category">
                    <option value="">Select Category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label for="status" className="form-label">Status</label>
                  <select className="form-select" id="status" name="status" value={formData.status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label for="content" className="form-label">Content</label>
                <textarea
                  className="form-control" id="content" rows="5" name="content" onChange={handleChange} value={formData.content}></textarea>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link
                  to="/"
                  className="btn btn-secondary me-md-2"
                >
                  Cancel
                </Link>
                {issubmitting ?
                <button type="button" className="btn btn-primary">Saving...</button>
                :
                <button type="submit" className="btn btn-primary">Update Post</button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 
