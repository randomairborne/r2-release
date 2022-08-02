# r2-release action

This action uploads a file to Cloudflare R2 (or any other S3 provider)

## Inputs

## `endpoint`

**Required** The S3 endpoint URL.

## `accesskeyid`

**Required** The S3 access key ID.

## `secretaccesskey`

**Required** The S3 access key.

## `bucket`
DEAR GOD<br>
**Required** The S3 bucket you want to upload to.

## `file`

**Required** Which file you want to upload

## `destination`

**Optional** Where you want the file to end up. Defaults to '/(filename)'.

## Example usage
```yaml
uses: randomairborne/r2-release@main
with:
  endpoint: ${{ secrets.S3_ENDPOINT }}
  accesskeyid: ${{ secrets.S3_ACCESS_KEY_ID }}
  secretaccesskey: ${{ secrets.S3_SECRET_ACCESS_KEY }}
  bucket: 'my-s3-bucket'
  file: './target/release/my-app.exe'
  destination: '/download/my-app.exe'
  ```