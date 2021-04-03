import { gql } from "apollo-server"

export default gql`
    type Photo{
        id:         Int!
        user:       User!
        file:       String!
        caption:    String
        hashtags:   [Hashtag]
        createdAt:  String!
        updatedAt:  String!
        likes:      Int!
        comments:   Int!
        isMine:     Boolean!
        isLike:     Boolean!
    }

    type Hashtag{
        id:         Int!
        hashtag:    String!
        photos(page: Int!): [Photo]
        totalPhotos: Int!
        createdAt:  String!
        updatedAt:  String!
    }

    type Like{
        id: Int!
        photo: Photo!
        createdAt:  String!
        updatedAt:  String!
    }
`;
