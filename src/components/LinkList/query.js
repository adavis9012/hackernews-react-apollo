export const FEED_QUERY = gql`
    {
        feed {
            links {
                id
                createdAt
                url
                description
            }
        }
    }
`;