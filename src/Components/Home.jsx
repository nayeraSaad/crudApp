import apiRequest from "../apiRequest";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UseFetch } from "../Hooks/UseFetch";
import Search from "./Search";

export default function Home() {
  

  const { formData, loading, error, setFormData } = UseFetch("http://localhost:3000/users");
  const [filteredData, setFilteredData] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!formData) return null;

  const handleDelete = async (id) => {
    const confirm = window.confirm("are you sure you want to delete item ? ");
    if (confirm) {
      try {
        await apiRequest("DELETE", "http://localhost:3000/users/" + id);
        setFormData(formData.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  };


  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 ">
      <h1 className=" bg-dark text-white  rounded pe-5 ps-5 pb-2 mt-3">List Of Users</h1>
      <div className="w-75 rounded bg-white border shadow p-4 table-responsive">
       <Search items={formData} onSearch={setFilteredData} />
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
            {(filteredData || formData).map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Link
                      to={`/Read/${item.id}`}
                      className="btn btn-sm btn-info me-4"
                    >
                      View
                    </Link>
                    <Link
                      to={`/update/${item.id}`}
                      className="btn btn-sm btn-primary me-4 "
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-sm btn-danger "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Link to="/create" className="btn btn-dark m-lg-2 m-h-3">
          Add User +
        </Link>
      </div>
    </div>
  );
}
