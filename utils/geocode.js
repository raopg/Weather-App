const request = require("request")

const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicmFvcGciLCJhIjoiY2p2aW95ZXltMDg0ODRhbnF6OGNhcW1pYiJ9.ULIFciZwLtTbpD4fgxyFlA&limit=1"
    request({url,json:true},(error, {body})=>{
        if(error){
            callback("Unable to connect to geolocation services.",undefined)
        } else if(body.message || body.features.length === 0){
            callback("Unable to find location: " + body.message,undefined)
        } else{
            const coordinates = body.features[0].center
            callback(undefined,{
                latitude:coordinates[1],
                longitude:coordinates[0],
                location:body.features[0].place_name
            })
        }

    })
}

module.exports = geocode