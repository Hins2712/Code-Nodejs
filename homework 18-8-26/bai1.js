const querystring = require('querystring');

const queryString = "name=Lan&course=NodeJS&score=9";

const parsedData = querystring.parse(queryString);

console.log(" Kết quả Parse ");
console.log(`Name: ${parsedData.name}`);
console.log(`Course: ${parsedData.course}`);
console.log(`Score: ${parsedData.score}`);

const newObject = {
    name: "Tloan",
    course: "NodeJS",
    score: 8.5
};

const newQueryString = querystring.stringify(newObject);

console.log("\n Kết quả Stringify ");
console.log(`Query String mới: ${newQueryString}`);
