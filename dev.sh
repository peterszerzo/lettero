#!/bin/bash
postcss ./src/index.css --use postcss-cssnext --output ./src/index.compiled.css --watch &
elm-app start
