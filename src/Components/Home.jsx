import axios from "axios";

import { useEffect, useState } from "react";
import { Link} from "react-router-dom";

export default function Home() {
  
 const [formData, setFormData] = useState([]);
 const[searchItem, setSearchItem]= useState('');

 

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setFormData(res.data))
      .catch((err) => console.log(err));
  }, []);

const handleDelete= (id)=>{
const confirm = window.confirm("are you sure you want to delete item ? ");
if(confirm){
  axios.delete("http://localhost:3000/users/"+id)
  .then(res=>{
    console.log(res);
    location.reload();
  }).catch(err=>console.log(err));
}
}



  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 ">
      <h1>List Of Users</h1>
      <div className="w-75 rounded bg-white border shadow p-4 table-responsive">
        <div className="d-flex justify-content-center mb-4">
         
          <input type="text"
          className=" rounded w-25"
           placeholder=" Search ... "
           onChange={(event)=>setSearchItem(event.target.value)}
           value={searchItem}></input>
         

        </div>
        <table className=" table table-striped">
          <thead>
            <tr>
              
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {formData
            .filter((item)=>{
              return searchItem.toLowerCase() === '' ? item : item.name
              .toLowerCase().includes(searchItem);
            })
            //.sort((a,b)=>a.id - b.id)
              .map((item,index) => (
                <tr key={index}>
                  
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Link to={`/Read/${item.id}`}className="btn btn-sm btn-info me-4">View</Link>
                    <Link to={`/Update/${item.id}`} className="btn btn-sm btn-primary me-4 ">
                      Edit
                    </Link>
                    <button onClick={()=>handleDelete(item.id)} className="btn btn-sm btn-danger ">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Link to="/Create" className="btn btn-dark m-lg-2 m-h-3">
            Add User +
          </Link>
      </div>
    </div>
  );}

