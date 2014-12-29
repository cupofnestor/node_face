#!/bin/bash
export PATH=/usr/local/bin/:$PATH
api_path="/Volumes/Pylos/Projects/node_face/"
echo $api_path
forever start --workingDir=$api_path $api_path"api.js"