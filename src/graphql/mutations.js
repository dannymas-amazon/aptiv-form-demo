/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOperator = /* GraphQL */ `
  mutation CreateOperator(
    $input: CreateOperatorInput!
    $condition: ModelOperatorConditionInput
  ) {
    createOperator(input: $input, condition: $condition) {
      id
      name
      team
      createdAt
      updatedAt
    }
  }
`;
export const updateOperator = /* GraphQL */ `
  mutation UpdateOperator(
    $input: UpdateOperatorInput!
    $condition: ModelOperatorConditionInput
  ) {
    updateOperator(input: $input, condition: $condition) {
      id
      name
      team
      createdAt
      updatedAt
    }
  }
`;
export const deleteOperator = /* GraphQL */ `
  mutation DeleteOperator(
    $input: DeleteOperatorInput!
    $condition: ModelOperatorConditionInput
  ) {
    deleteOperator(input: $input, condition: $condition) {
      id
      name
      team
      createdAt
      updatedAt
    }
  }
`;
export const createFNCRecords = /* GraphQL */ `
  mutation CreateFNCRecords(
    $input: CreateFNCRecordsInput!
    $condition: ModelFNCRecordsConditionInput
  ) {
    createFNCRecords(input: $input, condition: $condition) {
      fnc_number
      description
      article
      article_id
      machine_id
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateFNCRecords = /* GraphQL */ `
  mutation UpdateFNCRecords(
    $input: UpdateFNCRecordsInput!
    $condition: ModelFNCRecordsConditionInput
  ) {
    updateFNCRecords(input: $input, condition: $condition) {
      fnc_number
      description
      article
      article_id
      machine_id
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteFNCRecords = /* GraphQL */ `
  mutation DeleteFNCRecords(
    $input: DeleteFNCRecordsInput!
    $condition: ModelFNCRecordsConditionInput
  ) {
    deleteFNCRecords(input: $input, condition: $condition) {
      fnc_number
      description
      article
      article_id
      machine_id
      id
      createdAt
      updatedAt
    }
  }
`;
