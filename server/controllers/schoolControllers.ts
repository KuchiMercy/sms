import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createSchool, getAllSchoolsService } from "../services/schoolServices";
import schoolModel from "../models/school.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import axios from "axios";

// upload school
export const uploadSchool = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      createSchool(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// edit school
export const editschool = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data.thumbnail;

      const schoolId = req.params.id;

      const schoolData = await schoolModel.findById(schoolId) as any;

      if (thumbnail && !thumbnail.startsWith("https")) {
        await cloudinary.v2.uploader.destroy(schoolData.thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "schools",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (thumbnail.startsWith("https")) {
        data.thumbnail = {
          public_id: schoolData?.thumbnail.public_id,
          url: schoolData?.thumbnail.url,
        };
      }

      const school = await schoolModel.findByIdAndUpdate(
        schoolId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        school,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get single school --- without purchasing
export const getSingleschool = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schoolId = req.params.id;

      const isCacheExist = await redis.get(schoolId);

      if (isCacheExist) {
        const school = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          school,
        });
      } else {
        const school = await schoolModel.findById(req.params.id).select(
          "-schoolData.videoUrl -schoolData.suggestion -schoolData.questions -schoolData.links"
        );

        await redis.set(schoolId, JSON.stringify(school), "EX", 604800); // 7days

        res.status(200).json({
          success: true,
          school,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all schools --- without purchasing
export const getAllschools = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schools = await schoolModel.find().select(
        "-schoolData.videoUrl -schoolData.suggestion -schoolData.questions -schoolData.links"
      );

      res.status(200).json({
        success: true,
        schools,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get school content -- only for valid user
// export const getschoolByUser = catchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userschoolList = req.user?.schools;
//       const schoolId = req.params.id;

//       const schoolExists = userschoolList?.find(
//         (school: any) => school._id.toString() === schoolId
//       );

//       if (!schoolExists) {
//         return next(
//           new ErrorHandler("You are not eligible to access this school", 404)
//         );
//       }

//       const school = await schoolModel.findById(schoolId);

//       const content = school?.schoolData;

//       res.status(200).json({
//         success: true,
//         content,
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }
// );


// get all schools --- only for admin
export const getAdminAllschools = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllSchoolsService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Delete school --- only for admin
export const deleteschool = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const school = await schoolModel.findById(id);

      if (!school) {
        return next(new ErrorHandler("school not found", 404));
      }

      await school.deleteOne({ id });

      await redis.del(id);

      res.status(200).json({
        success: true,
        message: "school deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// generate video url
export const generateVideoUrl = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;
      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
          },
        }
      );
      res.json(response.data);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);