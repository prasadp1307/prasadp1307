import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  userEmail: string;
  resume: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: [true, "Resume or cover letter is required"],
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

ApplicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });

const Application: Model<IApplication> = mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);

export default Application;
