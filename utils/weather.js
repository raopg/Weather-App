const request = require("request")

const weather = (latitude, longitude, callback)=>{
    const url = "https://api.darksky.net/forecast/2ad05961fc290f731a0e7b43285bd60a/" + latitude + "," + longitude
    request({url,json:true}, (error, {body})=>{
        if(error){
            callback("Unable to connect to the weather API.", undefined)
        } else if(body.error){
            callback("Weather API error occurred: " + body.error, undefined)
        } else{
            const dailyInfo = body.daily.data[0]
            const currentInfo = body.currently
            callback(undefined,dailyInfo.summary + " It is currently "+ currentInfo.temperature +" degrees outside. The high today is " + dailyInfo.temperatureHigh+ ". The low today is "+dailyInfo.temperatureLow +". There is a " + currentInfo.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = weather