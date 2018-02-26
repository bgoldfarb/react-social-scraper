import React, { Component } from 'react';
import keys from '../keys'


let client = ""
let twitterObject = []
let sortedObject = []
class TwitterScraper extends Component {

    constructor(props){
      super(props)
        this.state = {
           
        }
      } 

      twitterSetup = () => {
        let Twitter = require('twitter')
         client = new Twitter({
                consumer_key: keys.consumer_key,
                consumer_secret: keys.consumer_secret,
                access_token_key: keys.access_token_key,
                access_token_secret: keys.access_token_secret
            })
    }



twitterSearch = (query, showTweets, queryData) => {
 
    if(showTweets && query.length > 0){
    this.twitterSetup()
        client.get('search/tweets', {q: query, count: 50,  lang: 'en', tweet_mode: 'extended',  result_type: this.props.popularOrLatest === 'popular' ? 'popular' : ""} ,(error, tweets, response) => {
            if(!error && tweets.statuses.length > 0){
                 tweets.statuses.map((i, index) => {
                    twitterObject.push(i)
                    console.log(this.props.sortByFavorites)
                    if(!this.props.sortByFavorites){
                    sortedObject = (twitterObject.sort((a,b) =>  -1*((a.favorite_count > b.favorite_count) ? 1 : ((b.favorite_count > a.favorite_count) ? -1 : 0))))
                    }
                    else{
                        sortedObject = (twitterObject.sort((a,b) =>  -1*((a.user.followers_count > b.user.followers_count) ? 1 : ((b.user.followers_count > a.user.followers_count) ? -1 : 0))))
                    }
                    console.log(sortedObject)
                })
                sortedObject.map((i) => queryData(i.full_text,i.user.name,tweets.statuses.length, i.favorite_count, i.user.followers_count))
            }
        })
    }
    sortedObject = []
    twitterObject = []
}
 

 render() {
    return (
        <div>
         {this.twitterSearch(this.props.tweet, this.props.showTweets, this.props.queryData)}
        </div>
    );  
  }


}

export default TwitterScraper