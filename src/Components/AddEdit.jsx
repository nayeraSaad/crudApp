import apiRequest from "../apiRequest";
import FormItem from "./FormItem";
import { useNavigate, useParams } from "react-router-dom";
import { UseFetch } from "../Hooks/UseFetch";
import PropTypes from 'prop-types';

export default function AddEdit({ isEditMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch existing data only in edit mode
  const { formData, loading, error, setFormData } = UseFetch(
    isEditMode ? `http://localhost:3000/users/${id}` : null
  );

  if (isEditMode && loading) return <p>Loading...</p>;
  if (isEditMode && error) return <p>Error: {error.message}</p>;

  const handleSubmit = async (data) => {
    try {
      if (isEditMode) {
        // Update existing user
        const response = await apiRequest("PUT", `http://localhost:3000/users/${id}`, data);
        setFormData(response.data); // Update form data in state
      } else {
        // Create new user
        const response = await apiRequest("POST", "http://localhost:3000/users/", data);
        setFormData((prevValues) => [...prevValues, response.data]); // Add new user to state
      }
      navigate("/");
    } catch (error) {
      console.error("There was an error processing the request!", error);
    }
  };

  return (
    <div className="d-flex w-100 vh-100 align-items-center justify-content-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>{isEditMode ? "Edit User" : "Add User"}</h1>
        <FormItem onSubmit={handleSubmit} defaultValues={isEditMode ? formData : {}} />
      </div>
 </div>
);
}
AddEdit.propTypes = {        
  isEditMode: PropTypes.boolean,
};
