
call npm run tsc

REM Build the "build" folder
MKDIR build
MKDIR build\public
MKDIR build\shared
MKDIR build\shared\scripts
call browserify ./js-src/client/scripts/main.js -o ./build/public/bundle.js
copy js-src\index.js build\index.js
copy src\client\index.html build\public\index.html
copy src\client\lib\phaser.js build\public\phaser.js


copy js-src\shared\scripts build\shared\scripts

REM Start node
call node build\index.js