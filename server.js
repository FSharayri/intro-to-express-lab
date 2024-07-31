// import modules

import express from 'express'
import {collectibles} from './data/collectibles.js'
import { shoes } from './data/shoes.js'
// create Express app


const app = express()

// configure the app (app.set)



// mount Middleware (app.use)



// mount routes



// tell the app to listen on port 3000

app.listen(3000, function() {
  console.log('Listening on port 3000')
})


// Mount routes

app.get('/', function(req, res) {
  res.send('<h1>hello, friend</h1>')
})


app.get('/greetings/:username', function(req, res) {
  res.send(`<h1>whats up ${req.params.username}</h1>`)
})

app.get('/roll/:number', function(req, res) {
  !isNaN(req.params.number) ? 
    res.send(`<h1>You rolled a ${req.params.number}</h1>`)
    :
    res.send(`<h1>You must specify a number</h1>`)
  
})

app.get('/collectibles/:index', function(req, res) {
  let item = collectibles[req.params.index]
  if (item){
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
  }
  else{
    res.send(`This item is not yet in stock. Check back soon!`)
  }
})


app.get('/shoes', function(req,res){
  let filterMinPrice = false
  let filterMaxPrice = false
  let filterType = false
  if (req.query.minPrice) filterMinPrice=true
  if (req.query.maxPrice) filterMaxPrice=true
  if (req.query.type) filterType=true

  let filteredShoes = shoes.filter(shoe=>{
    
    if (filterMinPrice&& filterMaxPrice&& filterType)
      return (shoe.price> req.query.minPrice  && shoe.price < req.query.maxPrice&& shoe.type===req.query.type)
    else if (filterMaxPrice&&filterMinPrice)
      return (shoe.price> req.query.minPrice  && shoe.price < req.query.maxPrice)
    else if (filterMaxPrice&&filterType)
      return (shoe.price < req.query.maxPrice&& shoe.type===req.query.type)
    else if (filterMinPrice&&filterType)
      return (shoe.price > req.query.minPrice&& shoe.type===req.query.type)
    else if (filterMaxPrice) 
      return shoe.price < req.query.maxPrice
    else if (filterMinPrice) 
      return shoe.price > req.query.minPrice
    else if (filterType) 
      return shoe.type === req.query.type
    else 
      return true
  })
  res.send(filteredShoes)
})