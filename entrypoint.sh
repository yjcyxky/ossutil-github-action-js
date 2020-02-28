#!/bin/bash

set -e

ARGUMENTS=$1
ACCESSKEY=$2
ACCESSSECRET=$3
ENDPOINT=$4
OSS_BIN=`pwd`/ossutil

if [ -z "$ARGUMENTS" ]; then
  echo 'Required ossArgs parameter'
  exit 1
fi

if [ -z "$ACCESSKEY" ]; then
  echo 'Required accessKey parameter'
  exit 1
fi

if [ -z "$ACCESSSECRET" ]; then
  echo 'Required accessSecret parameter'
  exit 1
fi

if [ -z "$ENDPOINT" ]; then
  ENDPOINT="oss-cn-shanghai.aliyuncs.com"
fi

cat <<- EOF > ossutilconfig
[Credentials]
language=EN
endpoint=${ENDPOINT}
accessKeyID=${ACCESSKEY}
accessKeySecret=${ACCESSSECRET}
EOF

COMMAND="ossutil ${ARGUMENTS}"
echo "Runing command: ${COMMAND}"

chmod u+x "$OSS_BIN"
"$OSS_BIN" $ARGUMENTS --config-file ossutilconfig
