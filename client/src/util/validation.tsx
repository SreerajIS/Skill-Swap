import * as yup from "yup";

export const userRegisterValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(4, "Name must be at least 4 characters long")
    .matches(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]*$/, "Enter a valid name"),
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Invalid email"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .required("Re-enter the password to confirm ")
    .oneOf([yup.ref("password")], "Password does not match"),
});

export const workerRegisterValidationSchema = yup.object().shape({
  profile_photo: yup
  .mixed()
  .test('fileType', 'Only image files are allowed', (value) => {
    if (!value) {
      // No file selected, let the required validation handle this case
      return true;
    }

    // Use type casting to access the first element of the array
    const file = value as File[];

    // Check if the selected file is an image
    return file[0].type.startsWith('image/');
  })
  .required('Please upload a file'),
  certificate_photo: yup
    .mixed()
    .required("Please upload a photo")
    .test("fileType", "Only image files are allowed", (value) => {
      if (value instanceof File) {
        return value && value.type.startsWith("image");
      }
      return true;
    })
    .test("fileSize", "File is too large", (value) => {
      if (value instanceof File) {
        return value && value.size <= 5242880;
      }
      return true;
    }),
  about: yup
    .string()
    .required("about is required")
    .min(50, "about should be at least 50 characters long")
    .max(250, "about should be under 250 characters in length"),
  works: yup.string().required("You have select a work"),
  charges: yup
    .number()
    .required("Working charge per hour is required")
    .typeError("input must be a number")
    .positive("Number must be positive")
    .min(50, "Number must be greater than or equal to 50")
    .max(1000, "Number must be less than or equal to 1000")
    .defined(),
});

export const userLoginValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 character long"),
});

export const userForgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
});

export const userPasswordResetSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .required("Re-enter the password to confirm ")
    .oneOf([yup.ref("password")], "Password does not match"),
});
