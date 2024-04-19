const express=require("express")
const bodyParser= require("body-parser")
const request= require("request")
const https= require("https")

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(reqest,response){
    response.sendFile(__dirname+"/signup.html");
});

app.post("/",function(request,response){
    const firstName= request.body.firstName;
    const lastName= request.body.lastName;
    const email= request.body.email;

    const data={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData= JSON.stringify(data);

    const url="https://us8.api.mailchimp.com/3.0/lists/3a399d7c5d"

    const options={
        method: "POST",
        auth: "Prem:c14130c41673e0375c6c5bec96cee48d-us8"
    }

    const request1=https.request(url,options,function(res){

        if(res.statusCode === 200){
            response.sendFile(__dirname+"/success.html")
        }
        else{
            response.sendFile(__dirname+"/failure.html")
        }
    
        res.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })

    request1.write(jsonData);
    request1.end();


})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.post("/success",function(req,res){
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("server is running on port 3000");
})


//api key
//c14130c41673e0375c6c5bec96cee48d-us8

//audience listl
//3a399d7c5d
