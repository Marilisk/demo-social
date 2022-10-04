import React from "react";
import classes from './news.module.css';
import Comments from "./Comments";

class News extends React.Component {
    constructor(props) {
        super(props);
        this.articleText = props.news.map( article => <div>{article.text}</div>)
    }    

    render() {
        return <div className={classes.wrapper}>
            <div className={classes.list}>
                {this.props.news.map( a => { 
                    return <div className={classes.item} key={a.id + 'i'}>
                        <div className={classes.articleHeader} key={a.id + 'h'}>{a.header}</div>
                        <div className={classes.text} key={a.id + 't'}>
                            {a.isHidden ? null : a.text }
                        </div>
                        
                        <button key={a.id + 'b'} className={classes.readButton} onClick={ () => this.props.changeHiddenStatus(a.id)} >Показать текст</button>
                        
                    </div>
                })}
            </div>

            <Comments comments={this.props.comments} />
        </div>
    }
}

export default News;