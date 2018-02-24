var filter = require('lodash')

var Twitter = require('twitter')
var client = new Twitter({
        consumer_key: 'Mrgvd7Kk9QmDjDDVbuTP4SJC0',
        consumer_secret: 'UX7hgJI55K3Ra5zP0YRrKhcvmUwoDwtqakKv7fUPNCDcAuuKl3',
        access_token_key: '414490265-ghcZ1upaCvWpcRfSyELMjHjnvccPSCklGnAH1X3m',
        access_token_secret: 'kDkfabBybKW7gCVZLGsCIBXmt6Mfz6deeOZNOKMoCjdPJ'
    })


    client.get('search/tweets', {q: 'Old Navy', count: 50,  lang: 'en', tweet_mode: 'extended',  result_type: 'popular'} ,(error, tweets, response) => {
        if(!error && tweets.statuses.length > 0){
             tweets.statuses.map((i, index) => {
                // return queryData(i.full_text,i.user.name,tweets.statuses.length, i.favorite_count)
                console.log(i.full_text)
                console.log(tweets.statuses.length)
            })     
        }
    })



    // <span>{this.state.queryData.map((i, index) => <p className = "results"> <div key = {i} className = {`twitter-results-${i.includes('RT:') ? 'rt' : 'normal'}`}>{index+1 + " : " + i} <p className = "favorites">Favorites: {this.state.favoriteCount[index]} </p></div> <p className= "twitter-name" key = {index}> {this.state.name[index]} </p> </p>)} </span>
