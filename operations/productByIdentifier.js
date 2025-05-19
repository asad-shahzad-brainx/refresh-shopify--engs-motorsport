const operation = `
  query getProductByIdentifier($handle: String!) {
    productByIdentifier(identifier: {handle: $handle}) {
      id
      tags
    }
  }
`;

export default operation;
