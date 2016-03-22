#!/bin/bash

# Setup only required for non-polymer1 branches
if [ ${CI_BRANCH} != "polymer1.0" ]; then
    # Run old tests
    npm install -g wct-sauce
    export NPM_ROOT=$(npm root -g)
    cp -r $NPM_ROOT/wct-sauce $NPM_ROOT/web-component-tester/node_modules
    git clone -b ${CI_BRANCH} --single-branch https://github.com/uqlibrary/uqlibrary-elements ../uqlibrary-elements
    chmod 755 ../uqlibrary-elements/bin/*.sh
fi