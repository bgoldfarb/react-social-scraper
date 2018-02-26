import React, { Component } from 'react';
import keys from '../keys'


let client = ""
let twitterObject = []
let sortedObject = []


class TwitterScraper extends Component {
   twitterSetup = () => {
        let Twitter = require('twitter')
         client = new Twitter({
                consumer_key: keys.consumer_key,
                consumer_secret: keys.consumer_secret,
                access_token_key: keys.access_token_key,
                access_token_secret: keys.access_token_secret
            })
    }

userEntersValidQuery = (showTweets, query) => showTweets && query.length > 0

tweetsExistFromQuery = (error, tweets) => !error && tweets.statuses.length > 0

sortByFavoritesDescending = (a,b) => -1*((a.favorite_count > b.favorite_count) ? 1 : ((b.favorite_count > a.favorite_count) ? -1 : 0))

soryByFollowersDesending = (a,b) => -1*((a.user.followers_count > b.user.followers_count) ? 1 : ((b.user.followers_count > a.user.followers_count) ? -1 : 0))

sortByfavoritesOrFollowers = (twitterObject, sortedObject) => {

return sortedObject = !this.props.sortByFavorites ? (twitterObject.sort((a,b) => this.sortByFavoritesDescending(a,b))) : (twitterObject.sort((a,b) =>  this.soryByFollowersDesending(a,b)))

}

sendTwitterData = (sortedObject, queryData, tweets) => sortedObject.map((i) => queryData(i.full_text,i.user.name,tweets.statuses.length, i.favorite_count, i.user.followers_count))



twitterSearch = (query, showTweets, queryData) => {
    if(this.userEntersValidQuery(showTweets,query)){
        this.twitterSetup()
        client.get('search/tweets', {q: query, count: 50,  lang: 'en', tweet_mode: 'extended',  result_type: this.props.popularOrLatest === 'popular' ? 'popular' : ""} ,(error, tweets, response) => {
            if(this.tweetsExistFromQuery(error, tweets)){
                tweets.statuses.map((i, index) => {
                twitterObject.push(i)
                sortedObject = this.sortByfavoritesOrFollowers(twitterObject, sortedObject)
                })
            this.sendTwitterData(sortedObject, queryData, tweets)
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