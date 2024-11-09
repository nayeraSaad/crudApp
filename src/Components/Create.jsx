import apiRequest from "./apiRequest";
import FormItem from "./FormItem";
import { useState } from "react";
//import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [enteredValues, setEnteredValues] = useState([]);
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
        const response = await apiRequest("POST", "http://localhost:3000/users/", data)
        console.log(response);
        setEnteredValues(() => [...enteredValues, response.data]);
        navigate('/');
    } catch (error) {
        console.error("There was an error adding the user!", error);
    }
};
  return (
    <div className="d-flex w-100 vh-100 align-items-center justify-content-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add User</h1>
        <FormItem onSubmit={handleCreate} />
      </div>
    </div>
  );
}

