import { useState, useEffect } from "react";
import apiRequest from "../apiRequest";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await apiRequest("GET", "http://localhost:3000/users/"+id);
        setData(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    
    fetchItems();
},[id]);

  return (
    <div className="d-flex w-100 vh-100 align-items-center justify-content-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h3 className="mb-4">User Details :</h3>

        <div className="mb-2">
          <strong>Name: {data.name}</strong>
        </div>
        <div className="mb-2">
          <strong>Email: {data.email}</strong>
        </div>
        <div className="mb-4">
          <strong>Phone: {data.phone}</strong>
        </div>
        <Link to={`/Update/${id}`}  className="btn btn-success">
          Edit
        </Link>
        <Link to="/" className="btn btn-primary ms-3">
          Back
        </Link>
      </div>
    </div>
  );
}
