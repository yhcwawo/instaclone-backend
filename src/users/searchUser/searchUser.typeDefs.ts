import { gql } from "apollo-server"

export default gql`

    type Query{
        searchUser(keyword:String!): [User]
    }
`;





