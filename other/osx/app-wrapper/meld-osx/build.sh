#!/bin/bash

mkdir -p Meld.app/Contents/MacOS Meld.app/Contents/Resources

cp -f src/meld-wrapper Meld.app/Contents/MacOS
cp -f src/meld.icns Meld.app/Contents/Resources
cp -f src/info.plist Meld.app/Contents

chmod +x Meld.app/Contents/MacOS/meld-wrapper
chmod +x Meld.app

echo 'Meld.app created. Please move it to ~/Application folder or edit meld-osx.'

ln -svf "$(pwd)/src/meld-osx" "/usr/local/bin"
chmod +x /usr/local/bin/meld-osx
