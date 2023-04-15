const clients3 = require("@aws-sdk/client-s3");
const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

try {
    const endpoint = core.getInput('endpoint');
    const accesskeyid = core.getInput('accesskeyid');
    const secretaccesskey = core.getInput('secretaccesskey');
    const bucket = core.getInput('bucket');
    const file = core.getInput('file');
    const destination = core.getInput('destination');
    const credentials = {
        accessKeyId: accesskeyid,
        secretAccessKey: secretaccesskey,
    }
    const client = new clients3.S3Client({
        endpoint: endpoint,
        credentials: credentials,
    });


    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
        console.log('File Error', err);
        core.setFailed(err);
    });
    let key = "";
    if (destination == "") {
        key = path.basename(file);
    } else { key = destination; }
    const command = new clients3.PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: fileStream,
    });
    try {
        await client.send(command);
      } catch (err) {;
        core.setFailed(err);
      }
} catch (error) {
    core.setFailed(error.message);
}