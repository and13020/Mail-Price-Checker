const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000

// Allow express to use everything inside of my 'public' folder
app.use(express.static('public'))

// Allows access to data from forms etc. Extended true allows bodyParser to accept json like data within the form data including nested objects
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Opens server
app.listen(PORT, function(req, res) {
    console.log("The server is listening on port 5000")
})

// Set the 'views' folder to my folder called 'views'
app.set("views", "views")
app.set("view engine", "ejs")

// Can receive requests to get the '/' page
// Tip: This shouldn't call css, html, jpg etc files. It should be used to get ejs for example, because the previously mentioned types can be included through the 'public' folder.
app.get('/', function(req, res){
        console.log("Receive request for /")
        res.render('form')
})

// Can receive requests to get the '/form' page
app.get('/form', function(req, res){
        console.log("Receive request for /form")
        res.render('form')  // this will search from the views folder for 'form' file (will look for ejs because of the ejs setting)
    })

app.get('/displayCost', function(req, res){
        console.log("Receive request for /displayCost")
        //var params = getTypeAndWeight(req)
        res.render('displayCost', getTypeAndWeight(req))
})

function getTypeAndWeight(req){
    var myWeight = req.param('weight')
    var myMailType = req.param('mailType')
    var newMailType = ''
    switch(myMailType){
        case 'letter_stamped':
            newMailType = 'Letter (Stamped)'
            break
        case 'letter_metered':
            newMailType = 'Letter (Metered)'
            break        
        case 'envelope_large':
            newMailType = 'Large Envelopes (Flats)'
            break
        case 'first_class_service':
            newMailType = 'First-Class Package Service - Retail'
            break
    }
    var params = {weight : myWeight, 
                  mailType : newMailType}
    return params
}