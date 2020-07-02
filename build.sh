#!/bin/bash

rm -r build/shared
rm -r build/server

npm run tsc

browserify js-src/client/scripts/main.js -o build/public/bundle.js
cp js-src/index.js build/index.js
cp src/client/index.html build/public/index.html
cp src/client/lib/phaser.js build/public/phaser.js

cp -R js-src/shared build/shared
cp -R js-src/server build/server

cp -R src/client/css build/public
cp -R src/server/resources build/server/resources

node build/index.js