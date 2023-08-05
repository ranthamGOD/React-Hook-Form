import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DisplayTableData } from "./DisplayTableData";

const initialValues = {
  name: "",
  email: "",
  subscribe: false,
  interest: "technology",
};

const validationSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Required"),
  interest: Yup.string().required("Required"),
});

export default function App() {
  const [submittedData, setSubmittedData] = useState([]);
  console.log(submittedData);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, action) => {
      // alert("Form submitted!");
      setSubmittedData((prevData) => [...prevData, values]);
      action.resetForm();
    },
  });

  function handleClear() {
    setSubmittedData([]);
  }

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="mt-5 mb-4">Sign Up</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              {...formik.getFieldProps("name")}
            />

            {formik.touched.name && formik.errors.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...formik.getFieldProps("email")}
            />

            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="subscribe"
              {...formik.getFieldProps("subscribe")}
            />
            <label className="form-check-label" htmlFor="subscribe">
              <strong>Subscribe to Newsletter</strong>
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="interest" className="form-label">
              Interest:
            </label>
            <select
              className="form-select"
              id="interest"
              {...formik.getFieldProps("interest")}
            >
              <option value="technology">Technology</option>
              <option value="arts">Arts</option>
              <option value="sports">Sports</option>
              <option value="cooking">Cooking</option>
            </select>
            {formik.touched.interest && formik.errors.interest && (
              <div className="text-danger">{formik.errors.interest}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>

        <h2 className="my-3">Display Form Data</h2>

        <table className="table">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Did you Subscribe ?</th>
              <th>Interest</th>
            </tr>
            {submittedData.map((data, index) => (
              <DisplayTableData
                key={index}
                name={data.name}
                email={data.email}
                subscribe={data.subscribe}
                interest={data.interest}
              />
            ))}
          </tbody>
        </table>
        <button className="btn btn-dark" onClick={handleClear}>
          Clear All
        </button>
      </div>
    </React.Fragment>
  );
}
