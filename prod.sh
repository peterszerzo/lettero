#!/bin/bash
postcss ./src/index.css --use postcss-cssnext --output ./src/index.compiled.css &&
elm-app build &&
sed -i -e 's/js\/main/\/js\/main/g' ./dist/index.html &&
sed -i -e 's/css\/main/\/css\/main/g' ./dist/index.html
