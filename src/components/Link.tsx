import React from 'react';

interface LinkProps {
    link: {
        description: String
        url: String
    }
}

const Link: React.FC<LinkProps> = ((props) => {
    return (
        <div>
            <div>
                {props.link.description} ({props.link.url})
            </div>
        </div>
    )
});

export  default Link;