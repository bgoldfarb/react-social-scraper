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

const returnFilteredOutBrands = (i) => !gapBrands.includes(i.user.screen_name) && !i.user.screen_name.includes('Athleta')


let CronJob = require('cron').CronJob;
let gapQuery = '@Gap OR @OldNavy OR @Athleta OR @BananaRepublic'
let myQuery = "Goldfarb"


let everySecond = '* * * * * *'


let job = new CronJob(everySecond, () => {
  client.get('search/tweets', {q: myQuery, count: 300,  lang: 'en', tweet_mode: 'extended'} ,(error, tweets, response) => {

    let myMap = tweets.statuses.map((i) =>  i)
    let filteredObjcet = myMap.filter((i) => returnFilteredOutBrands(i))

    let today = new Date();
    let toAppend =  today+ ", " + filteredObjcet.length  +"\r\n"

    fs.appendFile('log.txt',toAppend, (err) => err ? console.log(err) : null)
  })
  }, () => console.log('done'), true
);

