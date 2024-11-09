import { Link, useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Update(){
    const { id } = useParams();
    const navigate = useNavigate();
    const[enteredValues, setEnteredValues]= useState({
        name:'',
        email:''
      });
  
    useEffect(() => {
      axios
        .get("http://localhost:3000/users/" + id)
        .then((res) => setEnteredValues(res.data))
        .catch((err) => console.log(err));
    }, [id]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put("http://localhost:3000/users/"+id, enteredValues)
        .then(res=>{
            console.log(res);
            navigate('/');
        }).catch((err) => console.log(err));
      };
    return(
        <div className="d-flex w-100 vh-100 align-items-center justify-content-center bg-light">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h1>Add User</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="mt-2 form-control"
                placeholder="Enter Name" 
                value={enteredValues.name}
                onChange={(event)=>setEnteredValues({...enteredValues,name: event.target.value})}></input>
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className=" mt-2  form-control"
                placeholder="Enter Email"
                value={enteredValues.email}
                onChange={(event)=>setEnteredValues({...enteredValues,email: event.target.value})}></input>
            </div>
            <div className="mb-2">
            <label htmlFor="name">Phone</label>
            <input
              type="text"
              name="name"
              className="mt-2 mb-4 form-control"
              placeholder="Enter Phone"
              value={enteredValues.phone}
              onChange={(event)=>setEnteredValues({...enteredValues,phone: event.target.value})}
            ></input>
          </div>
            <button className="btn btn-success">Update</button>
            <Link to="/" className="btn btn-primary ms-3">
              Back
            </Link>
          </form>
        </div>
    </div>
)
}
