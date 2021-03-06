import { gql } from "apollo-server"

export default gql`

    type likePhotoResult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        toggleLike(
            id:       Int!
        ): likePhotoResult
    }

`;


