#!/bin/sh

cd /Users/tsn/Desktop/MyMochaChaiSinonExample
mocha -g 'Code 1.2' specs --require specs/helpers/chai.js

# osascript -e 'tell application "Terminal" to return'

# node /Users/tsn/Desktop/microgearlib_test_jasmine/helper/publish_helper/publish_helper.js 4
# osascript -e 'tell app "Terminal"
# 	set currentTab to do script "node /Users/tsn/Desktop/MyMochaChaiSinonExample/lib/microgear_helpers/publish_helper/publish_helper.js 4"
# end tell'

# # /Users/tsn/Desktop/microgearlib_test_jasmine/node_modules/jasmine-node/bin/jasmine-node -m create /Users/tsn/Desktop/microgearlib_test_jasmine/spec 

# /Users/tsn/node_modules/mocha/bin/mocha -g 'Code 1.2' specs --require specs/helpers/chai.js


# osascript -e 'tell application "Terminal" to close (every window whose name contains "node")'

# osascript -e 'tell app "Terminal"
# 	set currentTab to do script "node /Users/tsn/Desktop/microgearlib_test_jasmine/helper/publish_helper/publish_helper.js 4"
# end tell'

# /Users/tsn/Desktop/microgearlib_test_jasmine/node_modules/jasmine-node/bin/jasmine-node -m unsub /Users/tsn/Desktop/microgearlib_test_jasmine/spec 

# osascript -e 'tell application "Terminal" to close (every window whose name contains "node")'

# echo "The test is running..."