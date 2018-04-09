import bodyParser from 'body-parser'
import routes from '../twitterApi'
import express from 'express'

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

let server = app.listen(3000, () => {
    console.log("Twitter Scraper running on port: ", server.address().port);
})  