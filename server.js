const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const chalk = require('chalk')

const app =
  express()
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use(express.static(path.resolve(__dirname, 'public')))
    .use(express.static(path.resolve(__dirname, 'dist')))

app.get((req, res, next) => res.sendFile(path.resolve('index.html')))

app.listen(8080, () =>
  console.log(chalk.magenta.italic('listening on 8080...'))
)
