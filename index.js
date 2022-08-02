import S3 from 'aws-sdk/clients/s3.js';
const core = require('@actions/core');
const github = require('@actions/github');

try {
    const endpoint = core.getInput('endpoint');
    const accesskeyid = core.getInput('accesskeyid');
    const secretaccesskey = core.getInput('secretaccesskey');
    const bucket = core.getInput('bucket');
    const file = core.getInput('file');
    const destination = core.getInput('destination');

    const s3 = new S3({
        endpoint: endpoint,
        accessKeyId: accesskeyid,
        secretAccessKey: secretaccesskey,
        signatureVersion: 'v4',
    });

    var uploadParams = { Bucket: bucket, Key: '', Body: '' };

    var fs = require('fs');
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
        console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    if (destination == "") {
        var path = require('path');
        uploadParams.Key = path.basename(file);
    } else { uploadParams.Key = destination; }

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } if (data) {
            console.log("Upload Success", data.Location);
        }
    });
} catch (error) {
    core.setFailed(error.message);
}