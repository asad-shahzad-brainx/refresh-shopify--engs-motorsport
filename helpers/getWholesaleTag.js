import operation from "../operations/productByIdentifier.js";
import client from "../helpers/shopifyAdmin.js";

async function getWholesaleTag(handle) {
  const variables = { handle };
  const { data } = await client.request(operation, { variables });
  const tags = data?.productByIdentifier?.tags;
  const wholesaleTag = tags?.find((tag) => tag.startsWith("wholesale::"));
  return wholesaleTag || "wholesale::18";
}

export default getWholesaleTag;
