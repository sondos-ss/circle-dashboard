import { Schema, model, Document } from "mongoose";
import { MemberInput } from "../types/member";

export interface MemberDocument extends MemberInput, Document {
  createdAt: Date;
  updatedAt: Date;
}
const memberSchema = new Schema<MemberDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    subcircle: {
      type: String,
      enum: ["NodeJS", "PHP", "Java", ".NET"],
      required: true
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true
    }
  },
  { timestamps: true }
);

const Member = model<MemberDocument>("Member", memberSchema);

export default Member;