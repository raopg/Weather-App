const path = require('path')
const express = require('express')
const hbs = require("hbs")
const geocode = require("../utils/geocode")
const weather = require("../utils/weather")
const app = express()

const resourcesPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Set up static resources.
app.use(express.static(resourcesPath))

app.get('' , (req,res) =>{
    res.render('index',{
        title:'Weather',
        info: "Use this app to get your weather!",
        name: 'Prateek Rao'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:"About",
        info:'A simple weather application using Node.js, Express and Handlebars',
        name:"Prateek Rao"
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title:"Help",
        info: "Here you can find useful information to any questions you may have about the weather app.",
        name: "Prateek Rao"
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide an address for the search."
        })
    }
    else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({error})
            }
            weather(latitude,longitude, (error,response) => {
                if(error){
                    return res.send({ error })
                }
                else{
                    return res.send({
                        location: location,
                        forecast: response,
                        address: req.query.address
                    })
                }
            })
        })
    }
})

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req,res) =>{
    res.render('404error',{
        title:"404",
        error:"Help article not found.",
        name: "Prateek Rao"
    })
})

app.get('/product',(req,res)=>{

})
app.get('*',(req,res) =>{
    res.render('404error',{
        title: "404",
        error:"Page not found.",
        name: "Prateek Rao"
    })
})

app.listen(3000, () =>{
    console.log("Server is up on port 3000")
})