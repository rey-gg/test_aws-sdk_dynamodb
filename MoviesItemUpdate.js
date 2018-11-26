const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-1',
    endpoint: 'http://localhost:8000'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const title = "The Big New Movie";

const params = {
    TableName: 'Movies',
    Key: {
        year: 2015,
        title: title
    },
    UpdateExpression: "set info.rating = :r, info.plot = :p, info.actors = :a",
    ExpressionAttributeValues: {
        ":r": 5.5,
        ":p": "Nothing for anybody",
        ":a": ["Pedro", "Julio"]
    },
    ReturnValues: "UPDATED_NEW"
};

console.log("Updating: ", title, " please wait...");

docClient.update(params, function (err, data) {
    if (err) {
        console.log("Don't was posible update ", title);
    } else {
        console.log("The Iter was updated. ", JSON.stringify(data, null, 2));
    }
});