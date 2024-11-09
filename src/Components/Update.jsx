import apiRequest from "../apiRequest";
import FormItem from "./FormItem";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enteredValues, setEnteredValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

 
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await apiRequest("GET", "http://localhost:3000/users/"+id);
        setEnteredValues(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    
    fetchItems();
},[id]);

  const handleUpdate = async (data) => {
    try {
      const response = await apiRequest("PUT", "http://localhost:3000/users/"+id, data)
      console.log(response);
      setEnteredValues(() => [...enteredValues, response.data]);
      navigate("/");
    } catch (error) {
      console.error("There was an error editing the user!", error);
    }
  };

  return (
    <div className="d-flex w-100 vh-100 align-items-center justify-content-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Edit User</h1>
        <FormItem onSubmit={handleUpdate} defaultValues={enteredValues} />;
      </div>
    </div>
  );
}
