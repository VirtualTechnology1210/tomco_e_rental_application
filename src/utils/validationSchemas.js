import * as yup from "yup";
const phoneRegex = /^[+]?[0-9]{10,15}$/;
const loginSchema = yup.object({
  phone: yup.string().matches(phoneRegex, "Invalid phone number").required("Phone number is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required")
});
const signupSchema = yup.object({
  full_name: yup.string().min(2, "Min 2 characters").max(100).required("Full name is required"),
  phone: yup.string().matches(phoneRegex, "Invalid phone number").required("Phone number is required"),
  email: yup.string().email("Invalid email").nullable().optional(),
  password: yup.string().min(6, "Min 6 characters").max(128).required("Password is required"),
  confirm_password: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm your password")
});
const ownerSignupSchema = signupSchema.shape({
  business_name: yup.string().max(150).nullable().optional(),
  city: yup.string().max(100).nullable().optional()
});
const forgotPasswordSchema = yup.object({
  phone: yup.string().matches(phoneRegex, "Invalid phone number").required("Phone is required")
});
const resetPasswordSchema = yup.object({
  new_password: yup.string().min(6, "Min 6 characters").required("Password is required"),
  confirm_password: yup.string().oneOf([yup.ref("new_password")], "Passwords must match").required("Confirm your password")
});
const createVehicleSchema = yup.object({
  name: yup.string().min(2).max(150).required("Vehicle name is required"),
  type: yup.string().oneOf(["BIKE", "CAR", "VAN", "TRUCK", "SCOOTER", "OTHER"]).required("Type is required"),
  brand: yup.string().max(100).nullable().optional(),
  model: yup.string().max(100).nullable().optional(),
  year: yup.number().min(1990).max((/* @__PURE__ */ new Date()).getFullYear() + 1).nullable().optional(),
  license_plate: yup.string().max(30).nullable().optional(),
  per_hour_cost: yup.number().positive("Must be positive").required("Hourly cost is required"),
  per_day_cost: yup.number().positive("Must be positive").required("Daily cost is required"),
  latitude: yup.number().min(-90).max(90).required("Location is required"),
  longitude: yup.number().min(-180).max(180).required("Location is required"),
  location_name: yup.string().max(500).nullable().optional()
});
const reviewSchema = yup.object({
  rating: yup.number().min(1).max(5).required("Rating is required"),
  comment: yup.string().max(1e3).nullable().optional()
});
const ownerProfileSchema = yup.object({
  business_name: yup.string().max(150).nullable().optional(),
  address: yup.string().nullable().optional(),
  city: yup.string().max(100).nullable().optional(),
  id_proof_url: yup.string().required("ID proof is required"),
  business_doc_url: yup.string().nullable().optional()
});
export {
  createVehicleSchema,
  forgotPasswordSchema,
  loginSchema,
  ownerProfileSchema,
  ownerSignupSchema,
  resetPasswordSchema,
  reviewSchema,
  signupSchema
};
