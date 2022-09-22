const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
// const PubNub = require('pubnub');

// const pubnub = new PubNub({
//   publishKey: "pub-c-c7ed2835-f7b4-4177-a078-aa9a039f15d9",
//   subscribeKey: "sub-c-f5fcf3b6-bfe0-4fb5-b596-36c627026a21",
//   userId: "shay.markanty@gmail.com",
// });

const app = express();

let counter = 0;
let jsonInput = '{}';
let trackedCsvs = [];

const folder = 'C:\\temp';
let fileCounter = 0;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }));
app.use(bodyParser.json({ limit: '25mb' }));

app.get('/', (req: any, res: any) => {
    res.json({
        message: 'Hello World, ' + counter++
    });
});

app.get('/play', (req: any, res: any) => {
    res.json(jsonInput);
});

app.get('/play/:filename', (req: any, res: any) => {
    const filename = req.params.filename;
    fs.readFile(`C:\\temp\\${filename}.json`, 'utf8', (err: any, data: any) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json(data);
    });
});

app.post('/image-upload', (req: any, res: any) => {
    trackedCsvs = [];
    jsonInput = JSON.stringify(req.body);

    res.json({
        message: `Got request with contents: ${jsonInput}`
    });
});

app.post('/upload', (req: any, res: any) => {
    const input = JSON.stringify(req.body);
    const filename = `${folder}\\file${fileCounter}.json`;
    fs.writeFile(filename, input, { flag: 'a+' }, () => { });
    res.json({ location: `file${fileCounter++}` });
});

app.post('/track/:filename', (req: any, res: any) => {
    const filename = req.params.filename;
    trackedCsvs.push(req.body.payload);
    fs.writeFile(`C:\\temp\\${filename}.csv`, req.body.payload + "\r\n", { flag: 'a+' }, () => { });

    // pubnub.publish(req.body.payload + "\r\n");
    // pubnub.publish(
    //     {
    //       channel: "my_channel",
    //       message: {"text": req.body.payload }
    //     },
    //     function(status: any, response: any) {
    //       console.log(status);
    //       console.log(response);
    //     }
    //   );
    res.json({ message: 'great success' });
});

app.listen(2020, () => {
    console.log('server is listening on port 2020!');
});