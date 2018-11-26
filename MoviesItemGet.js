const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-1",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "Movies";

const year = 2016;
const title = "The Big New Movie";

const params = {
    TableName: table,
    Key:{
        "year": year,
        "title": title
    }
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        if (Object.entries(data).length !== 0) {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        } else {
            console.log("Don't exist: ", title, " in the database.")
        }
    }
});