import React from 'react';
import {connect} from 'react-redux/es/exports.js';
import { changeHiddenStatusAC, setCommentsAC } from './../redux/news-reducer.js';

import * as axios from 'axios';
import News from "./News";

class NewsApiComponent extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=1&count=15`)
            .then(response => {
                this.props.setComments(response.data.items);
            });
    }

    render() {
        return <div>
            <News news={this.props.news}
                comments={this.props.comments}
                changeHiddenStatus={this.props.changeHiddenStatus}
            />
        </div>        
        
    }
}


let mapStateToProps = state => {
    return {
        news: state.newsPage.articles,
        comments: state.newsPage.comments,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        changeHiddenStatus: (id) => {
            dispatch(changeHiddenStatusAC(id));
        },
        setComments: (names) => {
            dispatch(setCommentsAC(names));
        },
    };
};

const NewsContainer = connect(mapStateToProps, mapDispatchToProps)(NewsApiComponent);


export default NewsContainer;
