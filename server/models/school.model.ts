import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

// export interface IComment extends Document {
//   user: IUser;
//   question: string;
//   questionReplies: IComment[];
// }

// interface IReview extends Document {
//   user: IUser;
//   rating?: number;
//   comment: string;
//   commentReplies?: IReview[];
// }

// interface ILink extends Document {
//   title: string;
//   url: string;
// }

interface ISchoolData extends Document {
  schoolName: string;
  schoolType: string;
  schoolAddress: string;
}

export interface ISchool extends Document {
  schoolName: string;
  schoolType: string;
  schoolAddress: string;
  purchased: number;
}

const schoolDataSchema = new Schema<ISchoolData>({
  schoolName: String,
  schoolType: String,
  schoolAddress: String,
});

const schoolSchema = new Schema<ISchool>(
  {
    schoolName: {
      type: String,
      required: true,
    },
    schoolType: {
      type: String,
      required: true,
    },
    schoolAddress: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const SchoolModel: Model<ISchool> = mongoose.model("School", schoolSchema);

export default SchoolModel;
