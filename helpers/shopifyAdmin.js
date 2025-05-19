import { createAdminApiClient } from "@shopify/admin-api-client";
import dotenv from "dotenv";
dotenv.config();

const client = createAdminApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DEV,
  apiVersion: "2025-04",
  accessToken: process.env.SHOPIFY_API_KEY_DEV,
});

export default client;
