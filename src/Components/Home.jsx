
import apiRequest from '../apiRequest'
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";

export default function Home() {
  
 const [formData, setFormData] = useState([]);
 const[searchItem, setSearchItem]= useState('');

 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await apiRequest("GET", "http://localhost:3000/users");
        setFormData(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    
    fetchItems();
},[]);

const handleDelete= async(id)=>{
const confirm = window.confirm("are you sure you want to delete item ? ");
if(confirm){
  try {
    await apiRequest("DELETE", "http://localhost:3000/users/"+id);
    location.reload();
  } catch (error) {
    console.error("Failed to delete item:", error); }
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

