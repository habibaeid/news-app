const express = require('express');
const app = express();
const port = process.env.port || 3000;
const hbs = require('hbs')
const request = require('request')


const nUrl = 'https://newsapi.org/v2/everything?q=tesla&from=2022-08-16&sortBy=publishedAt&apiKey=02407f2a4fb7451aba5fe2dd2b4214fb'

request({ url: nUrl, json: true, headers:{'User-Agent':'request'}}, (error, response) => {
    if (error) {        //low level error
        console.log('Error did not connect to API')
    }
    else if (response.body.status == "error") {
        console.log(response.body.message)
    }
    else {
        app.set('view engine', 'hbs');
        app.get('/', (req, res) => {
            res.render('index', {
                article: response.body.articles
            })
        })
    }
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })

