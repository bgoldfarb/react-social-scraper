import Twitter from 'twitter'
import keys from './src/keys'


let client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
})

let gapBrands = ['Gap', 'BananaRepublic', 'OldNavy']
let fs = require('fs')

let gapQuery = '@Gap OR @OldNavy OR @Athleta OR @BananaRepublic'
let myQuery = "Goldfarb"


var appRouter = function (app) {
    app.get("/", function(req, res) {
    let filteredObject = []
    client.get('search/tweets', {q: gapQuery, count: 300,  lang: 'en', tweet_mode: 'extended'} ,(error, tweets, response) => {
            res.set({
                'Access-Control-Allow-Origin': 'httsp://localhost:3001'
              })
            res.status(200).send(tweets)
    })
  })}
  
  module.exports = appRouter;   