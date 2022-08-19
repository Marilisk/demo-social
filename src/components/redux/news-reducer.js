const CHANGE_HIDDEN_STATUS = 'CHANGE_HIDDEN_STATUS';
const SET_COMMENTS = 'SET_COMMENTS';

let initialState = {
    articles: [
        {id: 1, isHidden: true, header: 'de Finibus Bonorum et Malorum', text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."'},
        {id: 2, isHidden: true, header: 'H. Rackham', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'},
        {id: 3, isHidden: true, header: 'et Malorum', text: 'totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'}
    ],
    comments: [
        {id: 1, name: 'Test'},
        {id: null, name: null}
    ]
}

const articleReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case CHANGE_HIDDEN_STATUS: {
            return {
                ...state, 
                articles: state.articles.map( a => {
                    if (action.id === a.id) {
                        return {...a, isHidden: false};                        
                    }
                    return a;
                }),  
            };
        }

        case SET_COMMENTS: {
            return {
                ...state,
                comments: action.comments,
            }
        }
        
        default:
            return state;
    };
};

export const changeHiddenStatusAC = (id) => ({type: CHANGE_HIDDEN_STATUS, id});
export const setCommentsAC = (comments) => ({type: SET_COMMENTS, comments});

export default articleReducer;