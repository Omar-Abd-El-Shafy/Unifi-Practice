import mongoose from "mongoose";
import taskModel from "../../ToDo/models/taskModel";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    tasks: [taskModel.schema],
  },
  { timestamps: true }
);
userSchema.index({ userName: 1, email: 1 });

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
export default mongoose.model("User", userSchema);
