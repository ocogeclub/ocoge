#!/bin/bash -x
# Usage: bash install.sh

# install node.js (=electron node version) via n (https://github.com/tj/n)
sudo bash ./files/n 14.16.0
# Install latest version of n via npm globally
sudo npm install -g n
# install desktop entry
cp -r ./files/share ~/.local/
# install binary files if exists
FILE="./files/binary.zip"
if [ -e $FILE ]; then
  unzip $FILE -d ..
else
  echo 'binary.zip not found. plz install manually.'
fi

# build ocoge
# prepare for installation electron
echo 'arch=armv7l' > ~/.npmrc
cd ..
npm install

read -p "Press enter to exit: "