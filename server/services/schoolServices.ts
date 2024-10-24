import { NextFunction, Request, Response } from "express";
import schoolModel from "../models/school.model";
import { catchAsyncError } from "../middleware/catchAsyncErrors";

//create a school
export const createSchool = catchAsyncError(
  async (data: any, req: Request, res: Response, next: NextFunction) => {
    const school = await schoolModel.create(data);
    res.status(201).json({
      success: true,
      school,
    });
  }
);

//Get All
export const getAllSchoolsService = async (res: Response) => {
  const schools = await schoolModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    schools,
  });
};
