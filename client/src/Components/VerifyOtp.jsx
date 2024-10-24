import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useSelector, useDispatch } from "react-redux";
import { verifyUser } from "../features/auth/AuthSlice";
import { toast } from "react-toastify";

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

const VerfiyOtp = () => {
  const dispatch = useDispatch();

  const initialValues = {
    num1: "",
    num2: "",
    num3: "",
    num4: "",
    num5: "",
    num6: "",
  };

  const [otp, setOtp] = useState(initialValues);

  const verificationNumber = Object.values(otp).join("")

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setOtp(values)
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <div className="flex h-[50vh] w-[50%] flex-1">
        <div className="mt-3 text-center sm:mt-5">
          <p className="text-base font-semibold leading-6 text-gray-900">
            Please enter the verification code that was sent to your email
          </p>
        </div>
        <div className="flex flex-1 flex-col w-[100%] relative justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <p className="text-sm mb-5 text-gray-500">Enter verification Codes</p>
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <Formik
              initialValues={otp}
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
    </>
  );
};

export default VerfiyOtp;
