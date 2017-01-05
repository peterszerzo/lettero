#!/bin/bash
postcss ./src/index.css --use postcss-cssnext --output ./src/index.compiled.css &&
elm-app build
