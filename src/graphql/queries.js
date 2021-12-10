/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOperator = /* GraphQL */ `
  query GetOperator($id: ID!) {
    getOperator(id: $id) {
      id
      name
      team
      createdAt
      updatedAt
    }
  }
`;
export const listOperators = /* GraphQL */ `
  query ListOperators(
    $filter: ModelOperatorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOperators(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        team
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFNCRecords = /* GraphQL */ `
  query GetFNCRecords($id: ID!) {
    getFNCRecords(id: $id) {
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
export const listFNCRecords = /* GraphQL */ `
  query ListFNCRecords(
    $filter: ModelFNCRecordsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFNCRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        fnc_number
        description
        article
        article_id
        machine_id
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
