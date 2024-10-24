import { useEffect, useState } from "react";
import { useRef } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { LogOut, verifyUser } from "../features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
const validationSchema = Yup.object({
  num1: Yup.string()
    .min(1, "Full Name must be at least 5 characters")
    .required("Full Name is required"),

  num2: Yup.string()
    .min(1, "Email must be at least 10 characters")
    .required("Email is required"),

  num3: Yup.string()
    .min(1, "password must be at least 6 characters")
    .required("password is required"),

  num4: Yup.string()
    .min(1, "password must be at least 6 characters")
    .required("password is required"),

  num5: Yup.string()
    .min(1, "password must be at least 6 characters")
    .required("password is required"),

  num6: Yup.string()
    .min(1, "password must be at least 6 characters")
    .required("password is required"),
});

export default function EmailModal({ handleOtpSubmit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isVerify, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );
  const [openModal, setOpenModal] = useState(true);

  // Array to hold OTP values
  const initialValues = {
    num1: "",
    num2: "",
    num3: "",
    num4: "",
    num5: "",
    num6: "",
  };

  // const [otp, setOtp] = useState(initialValues);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const input = values;
    console.log(input);
    const verificationNumber = Object.values(input).join("");
    if (values && user.activationToken) {
      const value = {
        activation_token: user.activationToken,
        activation_code: verificationNumber,
      };
      console.log(value);
      dispatch(verifyUser(value));
    }
    setSubmitting(false);
    resetForm();
  };

  useEffect(() => {
    if (isError && !isVerify) {
      toast.error(message);
    } else if (isVerify) {
      toast.success("User Verified Sucessfully");
      dispatch(LogOut());
      navigate("/");
    }
  }, [isError, isVerify, navigate, message, dispatch]);
  // const handleInputChange = (index, value) => {
  //   const newOtp = [...otp];
  //   newOtp[index] = value;
  //   setOtp(newOtp);

  //   // Move focus to the next input if the value is not empty and not the last input
  //   if (value && index < otp.length - 1) {
  //     inputRefs.current[index + 1].focus();
  //   }

  //   // Check if all OTP fields are filled
  //   if (newOtp.every((digit) => digit !== "") && user.activationToken) {
  //     const stringToken = otp.join("");
  //     const values = {
  //       activation_token: user.activationToken,
  //       activation_code: stringToken,
  //     };
  //     console.log(values);
  //     dispatch(verifyUser(values));

  //     // navigate("/");
  //   }
  // };

  // const handleSubmit = () => {
  //   if (otp.every((digit) => digit !== "")) {
  //     // Check if all fields are filled
  //     handleOtpSubmit();

  //     setOpenModal(false);
  //     toast.success("account created successfully");
  //   } else {
  //     toast.info("Please fill in all the OTP fields.");
  //   }
  // };

  return (
    openModal && (
      <Dialog open={openModal} onClose={() => {}} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Please enter the verification code that was sent to your email
                </DialogTitle>

                <div className="mt-2">
                  <p className="text-sm mb-5 text-gray-500">
                    Enter verification Codes
                  </p>
                  <div className="flex space-x-2">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting, resetForm }) => (
                        <Form className="space-y-6 mt-8">
                          <div className="flex space-x-2">
                            <Field
                              id="num1"
                              name="num1"
                              type="number"
                              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />

                            <Field
                              id="num2"
                              name="num2"
                              type="number"
                              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />

                            <Field
                              id="num3"
                              name="num3"
                              type="number"
                              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                            <Field
                              id="num4"
                              name="num4"
                              type="number"
                              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                            <Field
                              id="num5"
                              name="num5"
                              type="number"
                              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                            <Field
                              id="num6"
                              name="num6"
                              type="number"
                              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                          </div>

                          <div className="flex justify-end gap-5">
                            {/* Updated Cancel Button */}
                            <button
                              type="button"
                              onClick={() => resetForm()} // Reset form fields when clicking cancel
                              className="btn bg-white p-2 px-5 text-[12px] ring-1 ring-[#5243AA] rounded-sm font-semibold"
                            >
                              Cancel
                            </button>

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                            >
                              {isSubmitting ? "Submitting..." : "Register"}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>

              {/* <div className="mt-5 sm:mt-10">
                <button
                  type="button"
                  onClick={handleSubmit} // Call handleSubmit on button click
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Submit
                </button>
              </div> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    )
  );
}
