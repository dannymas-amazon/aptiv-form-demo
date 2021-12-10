import  { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

export const createOperator = async (data) => {
    try {
        const res = await API.graphql(graphqlOperation(mutations.createOperator, {input: data}))
        return res
    } catch (error) {
        console.log(error)
        throw(error)
    }
}

export const getOperatorById = async (id) => {
    try {
        const res = await API.graphql(graphqlOperation(queries.getOperator, {id: id}))
        return res
    } catch (error) {
        console.log(error)
        throw(error)
    }
}
