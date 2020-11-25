#!/usr/bin/env bash

# Install dependencies

sudo apt-get install  autoconf automake libtool libgtk2.0-dev

# Compile plugin

git clone https://github.com/codebrainz/overview-plugin.git

cd overview-plugin

./autogen.sh
./configure
make
sudo make install

# -- -- --

export arch='x86_64-linux'
export arch_deb='amd64'

# Copy pkg files

mkdir -p __pkg/usr/local/share/overview/
mkdir -p __pkg/usr/local/share/doc/overview/screenshots/
mkdir -p __pkg/usr/lib/$arch-gnu/geany/
mkdir -p __pkg/usr/local/share/doc/overview/COPYING

sudo cp /usr/local/share/overview/prefs.ui                                      __pkg/usr/local/share/overview/prefs.ui

sudo cp /usr/local/share/doc/overview/screenshots/screenshot-dark.png           __pkg/usr/local/share/doc/overview/screenshots/screenshot-dark.png
sudo cp /usr/local/share/doc/overview/screenshots/screenshot-keybindings.png    __pkg/usr/local/share/doc/overview/screenshots/screenshot-keybindings.png
sudo cp /usr/local/share/doc/overview/screenshots/screenshot-light.png          __pkg/usr/local/share/doc/overview/screenshots/screenshot-light.png
sudo cp /usr/local/share/doc/overview/screenshots/screenshot-prefs.png          __pkg/usr/local/share/doc/overview/screenshots/screenshot-prefs.png
sudo cp /usr/local/share/doc/overview/screenshots/screenshot-view-menu.png      __pkg/usr/local/share/doc/overview/screenshots/screenshot-view-menu.png

sudo cp /usr/lib/$arch-gnu/geany/overview.la                                    __pkg/usr/lib/$arch-gnu/geany/overview.la
sudo cp /usr/lib/$arch-gnu/geany/overview.so                                    __pkg/usr/lib/$arch-gnu/geany/overview.so

sudo cp /usr/local/share/doc/overview/COPYING                                   __pkg/usr/local/share/doc/overview/COPYING
sudo cp /usr/local/share/doc/overview/README.md                                 __pkg/usr/local/share/doc/overview/README.md

# Create deb package

mkdir -p __pkg/DEBIAN

echo Package:       GeanyOverviewPlugin               > __pkg/DEBIAN/control
echo Version:       0.1                              >> __pkg/DEBIAN/control
echo Architecture:  $arch_deb                        >> __pkg/DEBIAN/control
echo Maintainer:    mail@example.com                 >> __pkg/DEBIAN/control
echo Description:   OverviewPlugin for Geany editor  >> __pkg/DEBIAN/control

dpkg-deb -b __pkg ../GeanyOverviewPlugin-$arch_deb.deb

# Clean up

sudo make uninstall
