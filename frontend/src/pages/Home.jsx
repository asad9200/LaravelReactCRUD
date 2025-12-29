import React from 'react'
import { Link } from "react-router";
import api from '../api/api';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
function Home() {

  const [isloading, setisloading]= useState(false);
  const [allposts, setAllposts]= useState([]);
  const [deleteid, setdeleteid]= useState(0);

  useEffect(()=>{
    getAllposts();
  },[]);

  const getAllposts = async ()=>{
    setisloading(true);
    try{
      const response = await api.get('/get-all-post');
      setAllposts(response.data.allposts);

    } catch (error){
      console.log(error);

    } finally{
      setisloading(false);

    }

  }
   const deletemodal=(id)=>{
    setdeleteid(id);
    
  }; 
  const deletepost= async()=>{
    const response= await api.post('/delete-post', {deleteid});
    getAllposts();
    const modal= bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    modal.hide();

  };
  



  return (
    <div>
      
      <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className='display-4'>Post Management System</h1>
          <p className="lead">Manage Your Post Efficiently</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Posts</h5>
          <Link to="/create" className="btn btn-primary">
            <i className="fas fa-plus me-1"></i> Create New
          </Link>
        </div>
        <div className="card-body">
          {isloading ? <center>Loading...</center>:
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="posts-table-body">
                {allposts.map((item, index)=>( 
                <tr key={item.id}>
                  <td>{index+1}</td>
                  <td><Link to="#">{item.title}</Link></td>
                  <td>{item.author}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.status==='Published' ?
                    <span className="badge bg-success">{item.status}</span>
                    : item.status==='Draft' ?
                    <span className="badge bg-danger">{item.status}</span>
                    :
                    <span className='badge bg-warning'>{item.status}</span>
                  }
                    

                    </td>
                  <td>{moment(item.created_at).format('MMM D, YYYY h:mm A')}</td>
                  <td className="action-btns">
                    <Link to={`/edit-post/${item.id}`} className="btn btn-sm btn-primary">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button className="btn btn-sm btn-danger" onClick={()=>deletemodal(item.id)} data-bs-toggle="modal" data-bs-target='#deleteModal'>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>                 
                </tr>
                ))}
                
              </tbody>
            </table>
        </div>
              }
      </div>
      
    </div>
  </div>

  <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header bg-danger text-white">
          <h5 className="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          Are you sure you want to delete this post?
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-danger" onClick={deletepost} id="confirmDeleteBtn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}   

export default Home;
