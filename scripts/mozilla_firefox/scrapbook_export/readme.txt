
Build webarchiver from source or use compiled version
$ git clone git@github.com:newzealandpaul/webarchiver.git
$ cd webarchiver
$ xcodebuild
$ cp build/Release/webarchiver /usr/local/bin

Or use compiled version
$ gzip -dc webarchiver-0.9-bin.gz > /usr/local/bin/webarchiver

Set executable flag
$ chmod +x /usr/local/bin/webarchiver

Script needs to external library xmltodict
$ pip install xmltodict
