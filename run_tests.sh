#!/bin/bash

echo "The test is running..."
/Users/tsn/Desktop/microgearlib_test_jasmine/node_modules/jasmine-node/bin/jasmine-node -m create /Users/tsn/Desktop/microgearlib_test_jasmine/spec 

echo "The test is finished..."
/Users/tsn/Desktop/microgearlib_test_jasmine/node_modules/jasmine-node/bin/jasmine-node -m unsub /Users/tsn/Desktop/microgearlib_test_jasmine/spec 
echo "The test is finished..."

# /Users/tsn/Desktop/microgearlib_test_jasmine/node_modules/jasmine-node/bin/jasmine-node -m microgear /Users/tsn/Desktop/microgearlib_test_jasmine/spec
