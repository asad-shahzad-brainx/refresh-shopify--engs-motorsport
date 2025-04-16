import fs from "fs";
import prisma from "../helpers/prisma.js";
import client from "../helpers/shopifyAdmin.js";
import operation from "../operations/productSet.js";
import generateProductSetInput from "../helpers/generateProductSetInput.js";

// Flag to track if a refresh operation is currently running
let isRefreshInProgress = false;

const refreshShopify = async (req, res) => {
  // Check if a refresh is already in progress
  if (isRefreshInProgress) {
    return res.status(429).json({
      message:
        "A product refresh is already in progress. Please try again later.",
      status: "busy",
    });
  }

  // Set the flag to indicate a refresh is in progress
  isRefreshInProgress = true;

  // Send an immediate response
  res.status(200).send({
    message: "Product refresh started in the background",
    status: "started",
  });

  // Continue with the operation after sending the response
  try {
    // Implement batch processing instead of loading all products at once
    const batchSize = 1000;
    let skip = 0;
    let processedCount = 0;
    let hasMoreProducts = true;

    console.log("Starting batch processing of products");

    while (hasMoreProducts) {
      // Fetch a batch of products
      const productBatch = await prisma.products.findMany({
        take: batchSize,
        skip: skip,
      });

      if (productBatch.length === 0) {
        hasMoreProducts = false;
        console.log(
          `Completed processing all products. Total: ${processedCount}`
        );
        break;
      }

      console.log(
        `Processing batch of ${productBatch.length} products (${skip} to ${skip + productBatch.length})`
      );

      // Process each product in the current batch
      for (const product of productBatch) {
        const variables = generateProductSetInput(product);

        console.time(`product-${product.title}`);
        const response = await client.request(operation, { variables });
        console.timeEnd(`product-${product.title}`);

        fs.appendFileSync(
          `response-${new Date().toISOString().split("T")[0]}.jsonl`,
          `${JSON.stringify(response, null, 2)}\n`
        );

        processedCount++;
      }

      // Move to the next batch
      skip += batchSize;
      console.log(`Processed ${processedCount} products so far`);
    }

    await prisma.$disconnect();
    console.log("All products have been successfully updated in Shopify");
  } catch (error) {
    console.error("Error refreshing products:", error);
    try {
      await prisma.$disconnect();
    } catch (error) {
      console.error("Error disconnecting from database:", error);
    }
  } finally {
    // Always reset the flag when the operation completes, whether successful or not
    isRefreshInProgress = false;
  }
};

// Add a function to check the status of the refresh operation
export const getRefreshStatus = () => {
  return {
    isRefreshInProgress,
  };
};

export default refreshShopify;
