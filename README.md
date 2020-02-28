<h2 align="center">GitHub actions for aliyun ossutil</h2>
<p align="center">update/download/upload files from/to aliyun oss</p>

<p align="center">Jingcheng Yang [yjcyxky@163.com]</p>

<p align="center">
<img src="https://github.com/go-choppy/ossutil-github-action-js/workflows/.github/workflows/test.yml/badge.svg" alt="Build Status">
<img src="https://img.shields.io/github/license/go-choppy/ossutil-github-action-js.svg" alt="License">
</p>

## Notice
If you only need to support linux, you can use [ossutil-github-action](https://github.com/go-choppy/ossutil-github-action)

## Inputs

### `ossArgs`
**Required** ossArgs to run ossutil command.

### `accessKey`
**Required** accessKey to authentication.

### `accessSecret`
**Required** accessSecret to authentication.

### `endpoint`
**Optional** endpoint to run ossutil command.


## Outputs

### `command`
the final command.

## Example usage

```yaml
uses: go-choppy/ossutil-github-action-js@master
with:
    ossArgs: 'cp -r -u ./ oss://choppy-docs'
    accessKey: ${{ secrets.ALIYUN_ACCESS_KEY }}
    accessSecret: ${{ secrets.ALIYUN_ACCESS_SECRET }}
    endpoint: oss-cn-shanghai.aliyuncs.com
```
