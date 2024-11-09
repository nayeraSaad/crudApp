import{ useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function FormItem({ onSubmit, defaultValues }) {
  const { register,
     handleSubmit,
     formState: { errors, isSubmitting },
      reset } = useForm();

 
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
    <div className="mb-2">
      <label htmlFor="name">
        Name<span className="text-danger">*</span>
      </label>
      <input
        type="text"
        id="name"
        name="name"
        autoComplete="text"
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
      <label htmlFor="email">
        Email<span className="text-danger">*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        autoComplete="email"
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
      <label htmlFor="phone">
        Phone<span className="text-danger">*</span>
      </label>
      <input
        type="tel"
        id="phone"
        name="phone" 
        autoComplete='tel'
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
  );
}
FormItem.propTypes = {
  onSubmit: PropTypes.func.isRequired,         
  defaultValues: PropTypes.object,
};

