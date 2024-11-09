import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FormItem() {
  const [enteredValues, setEnteredValues] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
   //await new Promise((resolve) => setTimeout(resolve, 3000));
      const response =await axios.post("http://localhost:3000/users", data);     
      console.log(data);

      setEnteredValues([...enteredValues, response.data]);
      reset();
    } catch (error) {
      console.error("There was an error adding the user!", error);
    }
  }
  return (
    <div className="d-flex w-100 vh-100 align-items-center justify-content-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add User</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label>
              Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="mt-2 form-control"
              placeholder="Enter Name"
              {...register("name", {
                required: "Name is required",
                minLength: 4,
              })}
            ></input>
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="mb-2">
            <label>
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className=" mt-2 form-control"
              placeholder="Enter Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email address",
                },
              })}
            ></input>
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="mb-2">
            <label>
              Phone<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="mt-2 mb-4 form-control"
              placeholder="Enter Phone"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^(?:\(\d{3}\)\s?|\d{3}[-\s]?)\d{3}[-\s]?\d{4}$/,
                  message:
                    "Please enter a valid phone number (e.g., 123-456-7890 or (123) 456-7890)",
                },
              })}
            ></input>
            {errors.phone && <p>{errors.phone.message}</p>}
          </div>
          <button
            className="btn btn-success"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "isLoading..." : "Submit"}
          </button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}
