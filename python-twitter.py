import tweepy
from textblob import TextBlob

consumer_key = 'Mrgvd7Kk9QmDjDDVbuTP4SJC0'
consumer_secret = 'UX7hgJI55K3Ra5zP0YRrKhcvmUwoDwtqakKv7fUPNCDcAuuKl3'
access_token = '414490265-ghcZ1upaCvWpcRfSyELMjHjnvccPSCklGnAH1X3m'
access_token_secret = 'kDkfabBybKW7gCVZLGsCIBXmt6Mfz6deeOZNOKMoCjdPJ'


auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

public_tweets = api.search('Old Navy')
for tweet in public_tweets:
    print(tweet.text)
    analysis = TextBlob(tweet.text)
    print(analysis.sentiment)
    print('\n\n\n')