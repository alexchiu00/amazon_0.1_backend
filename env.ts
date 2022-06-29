import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 8080,
  FRONTEND_URL: process.env.FRONTEND_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
  LOGGING_LEVEL: process.env.LOGGING_LEVEL || "silly",
  MONGODB: process.env.MONGODB
};
