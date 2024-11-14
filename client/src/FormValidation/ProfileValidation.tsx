import * as Yup from "yup";

export const editProfileValidationSchema = Yup.object({
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
  phone: Yup.string()
  .matches(
    /^[2-9]{1}[0-9]{9}$/,
      "Phone number must be 10 digits and cannot start with 0 or 1"
  ),
});
