import mongoose from "mongoose";
import User from "../services/User/models/userModel";
import bcrypt from "bcrypt";
import { mongoConfig } from "../config";
import { logger } from "../core/logger";
const data = [
  { userName: "kahled", email: "khaled@example.com", password: "password1" },
  { userName: "somia", email: "somia@example.com", password: "password2" },
];

async function seedDB() {
  await mongoose.connect(mongoConfig.url, {});

  await User.deleteMany({});

  for (const userData of data) {
    const hashedPassword = await bcrypt.hash(userData.password, 8);
    await User.create({ ...userData, password: hashedPassword });
  }

  logger.info("Database seeded!");
  mongoose.connection.close();
}

seedDB().catch((error) => {
  logger.error("Error seeding database:", error);
});
