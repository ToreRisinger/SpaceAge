
call npm run tsc

REM MKDIR js-src\client\lib
REM copy src\client\lib\phaser.js js-src\client\lib\phaser.js

REM Build the "build" folder
MKDIR build
MKDIR build\public
call browserify ./js-src/client/scripts/main.js -o ./build/public/bundle.js
copy js-src\server\index.js build\index.js
copy src\client\index.html build\public\index.html
copy src\client\lib\phaser.js build\public\phaser.js

REM Start node
call node build\index.js