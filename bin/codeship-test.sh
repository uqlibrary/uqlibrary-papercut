#!/bin/bash

echo "Testing branch: ${CI_BRANCH}"

if [ ${CI_BRANCH} != "polymer1.0" ]; then
    # Run old tests
    cd ../uqlibrary-elements
    ./bin/elements_local_tests.sh
    cd ../uqlibrary-papercut
    ../uqlibrary-elements/bin/sauce.sh
else
    # Only run if branch is Polymer
    if [ ${CI_BRANCH} == "polymer1.0" ] && [ ${PIPE_NUM} == "1" ]; then
        # Run local tests
        echo "Starting local WCT tests"
        bower install
        wct
    fi
fi