import React, {useReducer} from 'react';
import {gql, useMutation} from "@apollo/client";
import {History} from 'history';

interface State {
    description?: string
    url?: string
}

interface Action extends State{
    type: 'SET_DESCRIPTION' | 'SET_URL'
}

interface CreateLinkProps{
    history: History
}

const POST_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`;

const linkReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.description
            }
        case 'SET_URL':
            return {
                ...state,
                url: action.url
            }
        default:
            return state;
    }
};

const CreateLink: React.FC<CreateLinkProps> = (({history}) => {
    let [state, dispatch] = useReducer(linkReducer, {
        description: '',
        url: ''
    });
    const [savePost, {error, data}] = useMutation(POST_MUTATION, {
        variables: {...state},
        onCompleted: () => history.push('/')
    });

    return <div>
        <div className="flex flex-column mt3">
            {error ? <p>Houston we have a problem!</p> : null}
            {data ? <p>Saved!</p>: null}
            <input
                className="mb2"
                value={state.description}
                onChange={e => dispatch({type: 'SET_DESCRIPTION', description: e.target.value})}
                type="text"
                placeholder="A description for the link"
            />
            <input
                className="mb2"
                value={state.url}
                onChange={e => dispatch({type: 'SET_URL', url: e.target.value})}
                type="text"
                placeholder="The URL for the link"
            />
        </div>
        <button onClick={() => savePost()}>Submit</button>
    </div>;
});

export default CreateLink;