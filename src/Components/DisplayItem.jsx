import { useState } from "react";
import Update from "./Update";
import Create from "./Create";
import PropTypes from "prop-types";

export default function DisplayItem() {
  const [mode, setMode] = useState("Create");
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    phone:''
  });

  const handleCreate = (data) => {
    setFormData(data);
    setMode("Update");
    console.log(mode);
     // Switch to update mode after creation
  };

  const handleUpdate = (data) => {
    setMode("Update");
    console.log(mode);
    setFormData(data);
    
  };
  //const mode = formData ? "Create" :"Update" ;
  return (
    <div className="d-flex w-100 vh-100 align-items-center justify-content-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>{mode === "Update" ? "Edit User" : "Add User"}</h1>
        {mode === "Create" && (
          <Create formData={formData} setFormData={setFormData} onCreate={handleCreate}/>
        )}
        {mode === "Update" && (
          <Update
            formData={formData}
            onUpdate={handleUpdate}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
}
DisplayItem.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};
