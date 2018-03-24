import React, { Component } from 'react';
import keys from '../keys'
import Twitter from 'twitter'


let client = ""
let twitterObject = []
let sortedObject = []
let sortedCaseSensitiveObject = []
let filteredOutGapObject = []
let newSortedObjectByCase = []
let newSortedObjectFilterOutBrands = []
let gapBrands = ['Gap', 'BananaRepublic', 'OldNavy']

const twitterSetup = () => {
         client = new Twitter({
                consumer_key: keys.consumer_key,
                consumer_secret: keys.consumer_secret,
                access_token_key: keys.access_token_key,
                access_token_secret: keys.access_token_secret
            })
}

const sortByFavoritesDescending = (a,b) => -1*((a.favorite_count > b.favorite_count) ? 1 : ((b.favorite_count > a.favorite_count) ? -1 : 0))

const soryByFollowersDesending = (a,b) => -1*((a.user.followers_count > b.user.followers_count) ? 1 : ((b.user.followers_count > a.user.followers_count) ? -1 : 0))

const sortByfavoritesOrFollowers = (twitterObject) => !this.props.sortByFavorites ? (twitterObject.sort((a,b) => this.sortByFavoritesDescending(a,b))) : (twitterObject.sort((a,b) =>  this.soryByFollowersDesending(a,b)))

const sendTwitterData = (sortedObject, queryData, tweets) => sortedObject.map((i) => queryData(i.full_text,i.user.name,tweets.statuses.length, i.favorite_count, i.user.followers_count))

const returnCaseSensitiveTweets = (sortedObject, query) => {
    sortedCaseSensitiveObject = sortedObject
    let regex = new RegExp(query);
    return sortedCaseSensitiveObject.filter((i) => (i.full_text.search(regex) >= 0 && this.returnFilteredOutBrands(i)))
}

const returnFilteredOutBrands = (i) => !gapBrands.includes(i.user.screen_name) && !i.user.screen_name.includes('Athleta')

const filterGapTweets = (sortedObject, query) => {
    filteredOutGapObject = sortedObject
    return filteredOutGapObject.filter((i) => this.returnFilteredOutBrands(i))
}

export const twitterSearch = (query, queryData) => {
        this.twitterSetup()
        client.get('search/tweets', {q: query, count: 100,  lang: 'en', tweet_mode: 'extended',  result_type: this.props.popularOrLatest === 'popular' ? 'popular' : ""} ,(error, tweets, response) => {
                tweets.statuses.map((i, index) => {
                twitterObject.push(i)
                sortedObject = this.sortByfavoritesOrFollowers(twitterObject)
                })
            newSortedObjectByCase = this.returnCaseSensitiveTweets(sortedObject, query)
            newSortedObjectFilterOutBrands = this.filterGapTweets(sortedObject, query)
            this.sendTwitterData(this.props.caseSensitive ? newSortedObjectByCase: newSortedObjectFilterOutBrands, queryData, tweets)
            
        })
        sortedObject = [] 
    twitterObject = []
} 
    

 