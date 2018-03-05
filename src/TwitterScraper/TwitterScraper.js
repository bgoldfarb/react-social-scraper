import React, { Component } from 'react';
import keys from '../keys'


let client = ""
let twitterObject = []
let sortedObject = []
let sortedCaseSensitiveObject = []
let filteredOutGapObject = []
let newSortedObjectByCase = []
let newSortedObjectFilterOutBrands = []


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

sortByfavoritesOrFollowers = (twitterObject) => !this.props.sortByFavorites ? (twitterObject.sort((a,b) => this.sortByFavoritesDescending(a,b))) : (twitterObject.sort((a,b) =>  this.soryByFollowersDesending(a,b)))

sendTwitterData = (sortedObject, queryData, tweets) => sortedObject.map((i) => queryData(i.full_text,i.user.name,tweets.statuses.length, i.favorite_count, i.user.followers_count))

returnCaseSensitiveTweets = (sortedObject, query) => {
    sortedCaseSensitiveObject = sortedObject
    let regex = new RegExp(query);
    return sortedCaseSensitiveObject.filter((i) => (i.full_text.search(regex) >= 0 && this.returnFilteredOutBrands(i)))
}

returnFilteredOutBrands = (i) => i.user.screen_name !== 'Gap' && i.user.screen_name !== 'BananaRepublic' && i.user.screen_name !== 'OldNavy' && !i.user.screen_name.includes('Athleta')


filterGapTweets = (sortedObject, query) => {
    filteredOutGapObject = sortedObject
    return filteredOutGapObject.filter((i) => this.returnFilteredOutBrands(i))
}



twitterSearch = (query, showTweets, queryData) => {
    if(this.userEntersValidQuery(showTweets,query)){
        this.twitterSetup()
        client.get('search/tweets', {q: query, count: 100,  lang: 'en', tweet_mode: 'extended',  result_type: this.props.popularOrLatest === 'popular' ? 'popular' : ""} ,(error, tweets, response) => {
            (this.tweetsExistFromQuery(error, tweets))
                tweets.statuses.map((i, index) => {
                twitterObject.push(i)
                sortedObject = this.sortByfavoritesOrFollowers(twitterObject)
                })
            newSortedObjectByCase = this.returnCaseSensitiveTweets(sortedObject, query)
            newSortedObjectFilterOutBrands = this.filterGapTweets(sortedObject, query)
            this.sendTwitterData(this.props.caseSensitive ? newSortedObjectByCase: newSortedObjectFilterOutBrands, queryData, tweets)
            
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