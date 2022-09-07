# r2-upload action

This action uploads a file to Cloudflare R2

## Inputs

## `endpoint`

**Required** The R2 endpoint URL. Example: `https://<accountid>.r2.cloudflarestorage.com`

## `access_key_id`

**Required** The R2 Access Key ID.

## `secret_access_key`

**Required** The R2 Access Key.

## `bucket`
**Required** The R2 bucket you want to upload to.

## `file`

**Required** Which file you want to upload

## `destination`

**Optional** Where you want the file to end up. Defaults to '/(filename)'.

## Example usage
```yaml
- name: Upload file to R2
  uses: magicwallet/r2-upload@main
  with:
    endpoint: ${{ secrets.R2_ENDPOINT }}
    access_key_id: ${{ secrets.R2_ACCESS_KEY_ID }}
    secret_access_key: ${{ secrets.R2_ACCESS_SECRET_KEY }}
    bucket: ${{ secrets.R2_BUCKET }}
    file: ./index.html
    destination: '/public'
```
