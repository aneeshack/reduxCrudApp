import * as Yup from "yup";

const signupValidation = Yup.object({
  name: Yup.string()
  .trim()
  .matches(/^[a-zA-Z\s]*$/, "Name must only contain letters and spaces")
  .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .matches(
        /^[a-zA-Z0-9]{4,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/,
        "Invalid email format, please use abcd@gmail.com format"
      )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(/^\S*$/, "Password must not contain spaces"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default signupValidation;
