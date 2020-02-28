@ECHO OFF
Call :setError

set ARGUMENTS=%1
set ACCESSKEY=%2
set ACCESSSECRET=%3
set ENDPOINT=%4
set CURRENTDIR="%cd%"

if "%ARGUMENTS%" == "" (
  echo 'Required ossArgs parameter'
  exit /b 1
)

if "%ACCESSKEY%" == "" (
  echo 'Required accessKey parameter'
  exit /b 1
)

if "%ACCESSSECRET%" == "" (
  echo 'Required accessSecret parameter'
  exit /b 1
)

if "%ENDPOINT%" == "" (
  set ENDPOINT="oss-cn-shanghai.aliyuncs.com"
)

echo [Credentials]                  >> ossutilconfig
echo language=EN                    >> ossutilconfig
echo endpoint=%ENDPOINT%            >> ossutilconfig
echo accessKeyID=%ACCESSKEY%        >> ossutilconfig
echo accessKeySecret=%ACCESSSECRET% >> ossutilconfig

echo "Runing command: ossutil %COMMAND%"
%CURRENTDIR%/ossutil %ARGUMENTS% --config-file ossutilconfig
