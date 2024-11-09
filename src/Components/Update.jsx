import axios from "axios";
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
    axios
      .get("http://localhost:3000/users/" + id)
      .then((res) => setEnteredValues(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/users/" + id,
        data
      );
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
