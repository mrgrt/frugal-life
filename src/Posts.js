import React from 'react';
import axios from 'axios';

import Moment from 'moment';

import FlexibleContent from './FlexibleContent.js';

export default class Posts extends React.Component{
    state = {
        posts: [], 
        currentPage: 0,
        numberOfPages: 0,
        isLoading: true
    }


    componentDidMount(){
        this.loadPosts();
    }


    loadPosts = () =>  {
        let page = this.state.currentPage + 1;
        let fetchUrl = "https://frugal.grahamethomson.com/wp-json/wp/v2/posts?per_page=2&page=" + page;
        axios.get(fetchUrl)
        .then(res => {
                const posts = [...this.state.posts];
                let updatedPosts = posts.concat(res.data);
                let currentPage = this.state.currentPage + 1;
                this.setState({
                    posts: updatedPosts,
                    currentPage: currentPage,
                    isLoading: false,
                    totalPages: res.headers["x-wp-totalpages"]
                });
        })
    }


    renderBreakDown(breakdown){
        if(breakdown){
            return <div>{breakdown.map(breakdown =>  <li><i className={"fas fa-" + breakdown.icon}></i> <span dangerouslySetInnerHTML={{__html: breakdown.description}}></span> - £{breakdown.total}</li>)}</div>
        }
    }


    renderPost(post){
        if(post.categories_names.includes("Blog")){
           return this.renderBlogPost(post);
        } else{
            return this.renderDefaultPost(post);
        }
    }

    renderDefaultPost(post){
        return (
            <div className="day">
                <div className="summary">
                    <h3 className="date"><i className="far fa-clock"></i>{Moment(post.date).format('MMMM Do, GGGG')}</h3>
                        <div dangerouslySetInnerHTML={{__html: post.content.rendered}} />
                </div>
                <div className="spend">
                    <span className="spend__total">Total: £{post.acf.total}</span>
                    <ul className="spend__breakdown">
                        {this.renderBreakDown(post.acf.breakdown)}
                    </ul>
                </div>
            </div>
        );
    }


    renderImage(url,caption){
        return (
            <figure>
                <img src={url} />
                <figcaption>{caption}</figcaption>
            </figure>
        );
    }


    renderBlogPost(post){
        return (
            <li className="day day--blog">
                <div className="summary">
                    <h3 className="date"><span dangerouslySetInnerHTML={{__html: post.title.rendered}}></span></h3>
                    {post.acf.flexible_content.map(flexible_content => 
                        <FlexibleContent content={flexible_content} />
                    )}
                </div>
                <div>
                    {this.renderImage(post.featured_image_url, post.featured_image_caption)}
                </div>
            </li>  
        );
    }


    renderFooter = () => {
        const {currentPage, isLoading, totalPages} = this.state;
        if(isLoading){
            return '';
        }
        if(currentPage<totalPages){
            return <button className="loadmore" onClick={this.loadPosts}>Load More</button>
        } else{
            return <h2 className="endofposts">End of Posts</h2>
        }
    }
 

    render(){

        const {isLoading} = this.state;

        if(isLoading){
            return (
                <div>Fetching posts..</div>
            );
        }

        return(
            <div>
                <ul className="posts">
                    {this.state.posts.map(post => this.renderPost(post))}
                </ul>
                {this.renderFooter()}
            </div>
        )
    }


}