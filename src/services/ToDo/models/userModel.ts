import mongoose from "mongoose";
import taskModel from "./taskModel";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },

    tasks: [taskModel.schema],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
