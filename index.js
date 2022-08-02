const S3 = require('aws-sdk/clients/s3');
const core = require('@actions/core');
const fs = require('fs');

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

    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
        console.log('File Error', err);
        core.setFailed(err);
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
            core.setFailed(err);
        } if (data) {
            console.log("Upload Success", data.Location);
        }
    });
} catch (error) {
    core.setFailed(error.message);
}