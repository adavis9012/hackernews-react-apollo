import React from 'react';
import {gql, useQuery} from "@apollo/client";
import Link from './Link';

interface Link {
    id: number
    createdAt: string
    url: string
    description: string
}

interface FeedData {
    feed: {
        links: Link[]
    }
}

const GET_FEED_QUERY = gql`
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

const LinkList = (() => {
    const {loading, error, data} = useQuery<FeedData>(
        GET_FEED_QUERY
    );

    if (loading) return <div>Fetching...</div>;
    if (error) return <div>Error!</div>;

    return <div>
        {data?.feed.links.map((link: Link) => <Link key={link.id} link={link} />)}
    </div>;
});

export default LinkList;