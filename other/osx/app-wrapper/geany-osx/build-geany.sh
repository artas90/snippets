#!/bin/bash

# - - - - - -

appname="Geany"

# - - - - - -

applower=`echo $appname | awk '{print tolower($0)}'`

mkdir -p $appname.app/Contents/MacOS $appname.app/Contents/Resources

# - - - - - -

cat > $appname.app/Contents/MacOS/$applower-wrapper << EOF
#!/bin/bash
/usr/local/bin/$applower $*
EOF

# - - - - - -

cat > $appname.app/Contents/info.plist << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>

    <key>CFBundleName</key>
    <string>$appname</string>

    <key>CFBundleExecutable</key>
    <string>$applower-wrapper</string>

    <key>CFBundleIconFile</key>
    <string>$applower.icns</string>

    <key>CFBundleIdentifier</key>
    <string>com.osx.$applower.wrapper</string>

</dict>
</plist>
EOF

# - - - - - -

cp -f $applower.icns $appname.app/Contents/Resources

chmod +x $appname.app/Contents/MacOS/$applower-wrapper
chmod +x $appname.app

# - - - - - -

cat > /usr/local/bin/$applower-osx << EOF
#!/bin/bash
open -a $HOME/Applications/$appname.app --args $*
EOF

chmod +x /usr/local/bin/$applower-osx

# - - - - - -

echo "$appname.app created."
echo "Please move it to ~/Application folder or edit /usr/local/bin/$applower-osx."

unset appname applower
