const operation = `
  mutation productSet($input: ProductSetInput!, $identifier: ProductSetIdentifiers) {
    productSet(input: $input, identifier: $identifier) {
      product {
        id
      }
    }
  }
`;

export default operation;
