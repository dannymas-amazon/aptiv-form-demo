import  { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

export const createFNCRecord = async (data) => {
    try {
        const res = await API.graphql(graphqlOperation(mutations.createFNCRecords, {input: data}))
        return res
    } catch (error) {
        console.log(error)
        throw(error)
    }
}

export const getFNCRecordByFNCNumber = async (id) => {
    try {
        const res = await API.graphql(graphqlOperation(queries.getFNCRecords, {id: id}))
        return res
    } catch (error) {
        console.log(error)
        throw(error)
    }
}
