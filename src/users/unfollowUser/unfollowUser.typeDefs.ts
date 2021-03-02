import { gql } from "apollo-server"

export default gql`

    type unfollowUserResult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        unfollowUser(    
            username: String!
        ): unfollowUserResult!
    }
`;


