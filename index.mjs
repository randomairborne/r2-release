import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import core from "@actions/core";
import fs from "fs";
import path from "path";

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
    const client = new S3Client({
        endpoint: endpoint,
        credentials: credentials,
        region: null
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
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: fileStream,
    });
    try {
        await client.send(command);
    } catch (err) {
        core.setFailed(err);
    }
} catch (error) {
    core.setFailed(error.message);
}