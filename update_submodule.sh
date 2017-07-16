#!/bin/bash --posix

# Be sure to run this script at the airsonic/airsonic.github.io root folder.

rm -R pages/docs
mkdir pages/docs
git submodule init
git submodule update --remote --merge

# EOF
