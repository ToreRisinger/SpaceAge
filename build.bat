
call npm run tsc

REM Build the "build" folder
MKDIR build
MKDIR build\public
MKDIR build\shared
MKDIR build\shared\scripts
MKDIR build\server
MKDIR build\server\resources
MKDIR build\public\css


call browserify ./js-src/client/scripts/main.js -o ./build/public/bundle.js
copy js-src\index.js build\index.js
copy src\client\index.html build\public\index.html
copy src\client\lib\phaser.js build\public\phaser.js


copy js-src\shared\scripts build\shared\scripts
copy js-src\server build\server

copy src\client\css build\public\css
copy src\server\resources build\server\resources

REM Start node
call node build\index.js