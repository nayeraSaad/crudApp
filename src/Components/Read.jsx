
import { UseFetch } from "../Hooks/UseFetch";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Read() {
 
  const { id } = useParams();
  const { formData, loading, error } = UseFetch("http://localhost:3000/users", id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!formData) return null;

  return (
    <div className="d-flex w-100 vh-100 align-items-center justify-content-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h3 className="mb-4">User Details :</h3>

        <div className="mb-2">
          <strong>Name: {formData.name}</strong>
        </div>
        <div className="mb-2">
          <strong>Email: {formData.email}</strong>
        </div>
        <div className="mb-4">
          <strong>Phone: {formData.phone}</strong>
        </div>
        <Link to={`/update/${id}`}  className="btn btn-success">
          Edit
        </Link>
        <Link to="/" className="btn btn-primary ms-3">
          Back
        </Link>
      </div>
    </div>
  );
}
