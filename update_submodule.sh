#!/bin/bash

# Be sure to run this script at the airsonic/airsonic.github.io root folder and that your submodule are cloned locally.

pushd pages/docs
git fetch
git checkout master
git pull
popd
git add pages/docs
git commit -m 'Update docs submodule'

# EOF
