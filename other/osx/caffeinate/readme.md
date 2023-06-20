launchd controlled agent which prevents computer from going to sleep

```
micro ~/Library/LaunchAgents/com.apple.caffeinate.plist

launchctl load ~/Library/LaunchAgents/com.apple.caffeinate.plist

ps -ef | grep caffeinate
```
