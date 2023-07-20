//mapper for environment variables

export const environment = process.env.NODE_ENV;
export const corsURL = process.env.CORS_URL;
export const port = process.env.PORT || 3000;
export const mongoConfig = {
  url: process.env.DB_URL || "",
};

export const jwtSecret = process.env.SECRET;
