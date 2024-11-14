import * as Yup from "yup";

export const editUserValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^\S*$/, "Name must not contain spaces")
    .matches(/^[^\d]*$/, "Name must not contain numbers"),
});