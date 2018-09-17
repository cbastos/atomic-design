echo off
if "%1" == "pro" rmdir /s /q dist & docker-compose -f ./docker/pro/docker-compose.yml up --build --force-recreate
if NOT "%1" == "pro" docker-compose -f ./docker/dev/docker-compose.yml up