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
                    return <div className={classes.item}>
                        <div className={classes.articleHeader}>{a.header}</div>
                        <div className={classes.text}>
                            {a.isHidden ? null : a.text }
                        </div>
                        
                        <button className={classes.readButton} onClick={ () => this.props.changeHiddenStatus(a.id)} >Показать текст</button>
                        
                    </div>
                })}
            </div>

            <Comments comments={this.props.comments} />
        </div>

       

    }

 
}

export default News;