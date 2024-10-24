import express from "express";
import {
  deleteschool,
  editschool,
  generateVideoUrl,
  getAdminAllschools,
  getAllschools,
  // getschoolByUser,
  getSingleschool,
  uploadSchool,
} from "../controllers/schoolControllers";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const schoolRouter = express.Router();

schoolRouter.post(
  "/create-school",
  isAutheticated,
  authorizeRoles("admin"),
  uploadSchool
);

schoolRouter.put(
  "/edit-school/:id",
  isAutheticated,
  authorizeRoles("admin"),
  editschool
);

schoolRouter.get("/get-school/:id", getSingleschool);

schoolRouter.get("/get-schools", getAllschools);

schoolRouter.get(
  "/get-admin-schools",
  isAutheticated,
  authorizeRoles("admin"),
  getAdminAllschools
);

// schoolRouter.get("/get-school-content/:id", isAutheticated, getschoolByUser);

schoolRouter.post("/getVdoCipherOTP", generateVideoUrl);

schoolRouter.delete(
  "/delete-school/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteschool
);

export default schoolRouter;
