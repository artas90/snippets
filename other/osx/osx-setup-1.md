Setup Mac OS X Mountain Lion or Mavericks
=========================================

**Edit:** I few months ago I got a new laptop and did the same thing on
Mavericks.

I just replaced the hard drive of my mbp and decided to do a clean install of
Mountain Lion (10.8.5) since I was still using Snow Leopard (10.6.8).

I kinda regret for not using [Boxen](http://boxen.github.com/) to automate the
process, but TBH I have this laptop for almost 3yrs and this is the first
time I needed to reinstall everything, maybe the next time...

This gist is just a personal reference in case I need to do it all over again.
**I'm by no means an OSX/*nix expert, use with care.**


Setup
-----

### 1. Run software update

Make sure everything is up to date.


### 2. Install Xcode and/or "Command Line Tools"

"Command Line Tools" can be downloaded separate from Xcode at
https://developer.apple.com/downloads/ - It is way smaller than installing the
whole Xcode but might not work for all cases tho.

Xcode can be found on App Store. **preferred**

More info on [how to download Command Line Tools inside XCode can be found on StackOverflow](http://stackoverflow.com/questions/9329243/xcode-4-4-and-later-install-command-line-tools)


### 3. Install homebrew and CLI tools

http://brew.sh/

```sh
# install homebrew
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

brew install git
brew install node
brew install wget
brew install z
brew install ag
brew install ack
brew install ffind

npm install -g gh-markdown-cli
npm install -g http-server
npm install -g jshint
npm install -g esformatter
# yeah, haters gonna hate
npm install -g replace
```


### 4. Install softwares


#### homebrew-cask

Many softwares can be installed through
[homebrew-cask](https://github.com/phinze/homebrew-cask) which makes the
process way simpler:

```sh
# install homebrew-cask
brew install caskroom/cask/brew-cask

# essential
brew cask install adium
brew cask install caffeine
brew cask install dropbox
brew cask install one-password

# dev
brew cask install charles
brew cask install cornerstone
brew cask install filezilla
brew cask install imagealpha
brew cask install imageoptim
brew cask install iterm2
brew cask install livereload
brew cask install macvim
brew cask install sequel-pro
brew cask install virtualbox
brew cask install vagrant

# utils
brew cask install divvy
brew cask install istat-menus
brew cask install notational-velocity
brew cask install the-unarchiver
brew cask install vlc

# browsers
brew cask install firefox
brew cask install google-chrome

# others
brew cask install limechat
brew cask install skype
brew cask install rightzoom
brew cask install u-torrent

# quick look plugins (https://github.com/sindresorhus/quick-look-plugins)
brew cask install qlcolorcode qlstephen qlmarkdown quicklook-json qlprettypatch quicklook-csv betterzipql qlimagesize webpquicklook suspicious-package
```

#### App Store

 - TweetDeck

#### Manually

 - [Backblaze](www.backblaze.com)
 - [Firefox Nightly](http://nightly.mozilla.org/)
 - [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) ([how to set canary as default browser](http://aaltonen.co/2011/05/06/make-chrome-canary-the-default-browser-on-mac-os-x/))
 - Adobe Suite (Photoshop, Illustrator, ...)



### 5. Borrow a few OSX settings from [mathiasbynens dotfiles](https://github.com/mathiasbynens/dotfiles)


```sh
###############################################################################
# General UI/UX                                                               #
###############################################################################

# Disable the sound effects on boot
sudo nvram SystemAudioVolume=" "

# Menu bar: show remaining battery time (on pre-10.8); hide percentage
defaults write com.apple.menuextra.battery ShowPercent -string "NO"
defaults write com.apple.menuextra.battery ShowTime -string "YES"


###############################################################################
# Finder                                                                      #
###############################################################################

# Finder: show hidden files by default
defaults write com.apple.finder AppleShowAllFiles -bool true

# Finder: show all filename extensions
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# Finder: show status bar
defaults write com.apple.finder ShowStatusBar -bool true

# Finder: allow text selection in Quick Look
defaults write com.apple.finder QLEnableTextSelection -bool true

# Disable the warning when changing a file extension
defaults write com.apple.finder FXEnableExtensionChangeWarning -bool false

# Enable snap-to-grid for icons on the desktop and in other icon views
/usr/libexec/PlistBuddy -c "Set :DesktopViewSettings:IconViewSettings:arrangeBy grid" ~/Library/Preferences/com.apple.finder.plist
/usr/libexec/PlistBuddy -c "Set :FK_StandardViewSettings:IconViewSettings:arrangeBy grid" ~/Library/Preferences/com.apple.finder.plist
/usr/libexec/PlistBuddy -c "Set :StandardViewSettings:IconViewSettings:arrangeBy grid" ~/Library/Preferences/com.apple.finder.plist


###############################################################################
# Screen                                                                      #
###############################################################################

# Save screenshots to the desktop
defaults write com.apple.screencapture location -string "$HOME/Desktop"

# Save screenshots in PNG format (other options: BMP, GIF, JPG, PDF, TIFF)
defaults write com.apple.screencapture type -string "png"

# Disable shadow in screenshots
defaults write com.apple.screencapture disable-shadow -bool true


###############################################################################
# Address Book, Dashboard, iCal, TextEdit, and Disk Utility                   #
###############################################################################

# Use plain text mode for new TextEdit documents
defaults write com.apple.TextEdit RichText -int 0
# Open and save files as UTF-8 in TextEdit
defaults write com.apple.TextEdit PlainTextEncoding -int 4
defaults write com.apple.TextEdit PlainTextEncodingForWrite -int 4


###############################################################################
# Time Machine                                                                #
###############################################################################

# Prevent Time Machine from prompting to use new hard drives as backup volume
defaults write com.apple.TimeMachine DoNotOfferNewDisksForBackup -bool true


###############################################################################
# Spotlight                                                                   #
###############################################################################

# Hide Spotlight tray-icon (and subsequent helper)
#sudo chmod 600 /System/Library/CoreServices/Search.bundle/Contents/MacOS/Search
# Disable Spotlight indexing for any volume that gets mounted and has not yet
# been indexed before.
# Use `sudo mdutil -i off "/Volumes/foo"` to stop indexing any volume.
sudo defaults write /.Spotlight-V100/VolumeConfiguration Exclusions -array "/Volumes"
# Change indexing order and disable some file types
defaults write com.apple.spotlight orderedItems -array \
  '{"enabled" = 1;"name" = "APPLICATIONS";}' \
  '{"enabled" = 1;"name" = "SYSTEM_PREFS";}' \
  '{"enabled" = 1;"name" = "DIRECTORIES";}' \
  '{"enabled" = 1;"name" = "PDF";}' \
  '{"enabled" = 1;"name" = "FONTS";}' \
  '{"enabled" = 0;"name" = "DOCUMENTS";}' \
  '{"enabled" = 0;"name" = "MESSAGES";}' \
  '{"enabled" = 0;"name" = "CONTACT";}' \
  '{"enabled" = 0;"name" = "EVENT_TODO";}' \
  '{"enabled" = 0;"name" = "IMAGES";}' \
  '{"enabled" = 0;"name" = "BOOKMARKS";}' \
  '{"enabled" = 0;"name" = "MUSIC";}' \
  '{"enabled" = 0;"name" = "MOVIES";}' \
  '{"enabled" = 0;"name" = "PRESENTATIONS";}' \
  '{"enabled" = 0;"name" = "SPREADSHEETS";}' \
  '{"enabled" = 0;"name" = "SOURCE";}'
# Load new settings before rebuilding the index
killall mds
# Make sure indexing is enabled for the main volume
sudo mdutil -i on /
# Rebuild the index from scratch
sudo mdutil -E /
```

source: https://github.com/mathiasbynens/dotfiles/blob/master/.osx



### 6. Create/Update `~/.bash_profile`

```sh
export PS1='\w \$ '

set -o vi

export PATH="/usr/local/bin:/usr/local/sbin:$PATH"
export NODE_PATH="/usr/local/lib/node_modules:$NODE_PATH"

alias gvim="/Applications/MacVim.app/Contents/MacOS/Vim -g"
alias g="gvim --remote-silent"
alias cask="brew cask"

# https://github.com/git/git/blob/master/contrib/completion/git-completion.bash
if [ -f ~/.bash/git-completion.sh ]; then
    source ~/.bash/git-completion.sh
fi

# `npm completion > ~/.bash/npm-completion.bash`
if [ -f ~/.bash/npm-completion.sh ]; then
    source ~/.bash/npm-completion.sh
fi

# borrowed from http://petdance.com/2013/04/my-bash-prompt-with-gitsvn-branchstatus-display/
if [ -f ~/.bash/prompt.sh ]; then
    source ~/.bash/prompt.sh
fi

# enable the "z" command
. `brew --prefix`/etc/profile.d/z.sh
```


###  7. Create/Update `~/.gitconfig`

```gitconfig
; I removed the [user] block on purpose so other people don't copy it by mistake
; you will need to set these values
[apply]
    whitespace = fix
[color]
    ui = auto
[color "branch"]
    current = yellow reverse
    local = yellow
    remote = green
[color "diff"]
    meta = yellow bold
    frag = magenta bold
    old = red bold
    new = green bold
[color "status"]
    added = yellow
    changed = green
    untracked = cyan
[merge]
    log = true
[push]
    ; "simple" avoid headaches, specially if you use `--force` w/o specifying branch
    ; see: http://stackoverflow.com/questions/13148066/warning-push-default-is-unset-its-implicit-value-is-changing-in-git-2-0
    default = simple
[url "git://github.com/"]
    insteadOf = "github:"
[url "git@github.com:"]
    insteadOf = "gh:"
    pushInsteadOf = "github:"
    pushInsteadOf = "git://github.com/"
[url "git@github.com:millermedeiros/"]
    insteadOf = "mm:"
[url "git@github.com:mout/"]
    insteadOf = "mout:"
[core]
    excludesfile = ~/.gitignore_global
    ; setting the editor fixes git commit bug http://tooky.co.uk/2010/04/08/there-was-a-problem-with-the-editor-vi-git-on-mac-os-x.html
    editor = /usr/bin/vim
[alias]
    ; show merge tree + commits info
    graph = log --graph --date-order -C -M --pretty=format:\"<%h> %ad [%an] %Cgreen%d%Creset %s\" --all --date=short
    lg = log --graph --pretty=format:'%Cred%h%Creset %C(yellow)%an%d%Creset %s %Cgreen(%cr)%Creset' --date=relative
    ; basic logging for quick browsing
    ls = log --pretty=format:"%C(yellow)%h%Cred%d\\ %Creset%s%Cgreen\\ [%cn]" --decorate
    ll = log --pretty=format:"%C(yellow)%h%Cred%d\\ %Creset%s%Cgreen\\ [%cn]" --decorate --numstat
    ; log + file diff
    fl = log -u
    ; find paths that matches the string
    f = "!git ls-files | grep -i"
    ; delete all merged branches
    ; dm = !git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
    ; shortcuts
    cp = cherry-pick
    st = status -s
    cl = clone
    ci = commit
    co = checkout
    br = branch
    dc = diff --cached
```

You will need to set the user name and email (removed from .gitconfig to avoid
errors):

```sh
git config --global user.name "Your Name Here"
git config --global user.email youremail@example.com
```



### 8. Config vim

[my .vimrc is on this gist](https://gist.github.com/millermedeiros/1262085).


### 9. Configure npm and generate SSH keys for github

Need to set the npm user:

```sh
npm adduser
```

And also [generate SSH keys for github](https://help.github.com/articles/generating-ssh-keys)



### 10. Copy stuff from old HD

```sh
# recursively copy files and folders
# beware of rsync `-C, --cvs-exclude` flag since it might exclude files you
# don't want to like *.exe, core, tags...
rsync -av '/Volumes/Macintosh HD/Users/millermedeiros/Projects' ~/tmp_projects
rsync -av '/Volumes/Macintosh HD/Users/millermedeiros/Music/iTunes/iTunes Media' ~/tmp_music
```

Check if files were copied properly and rename/move. Copying to a temporary
folder since `rsync` might delete files depending on the options and/or merge
folders that you do not want to merge.

`rsync` is great, you should use it when possible.


### 11. Download IE test VMs for VirtualBox

these take a while to download! so maybe do it on a separate day as a
background process...

http://www.modern.ie/en-us/virtualization-tools

```sh
# IE8 XP
curl -O "https://az412801.vo.msecnd.net/vhd/IEKitV1_Final/VirtualBox/OSX/IE8_XP/IE8.XP.For.MacVirtualBox.ova"

# IE9 Win7
curl -O "https://az412801.vo.msecnd.net/vhd/IEKitV1_Final/VirtualBox/OSX/IE9_Win7/IE9.Win7.For.MacVirtualBox.part{1.sfx,2.rar,3.rar,4.rar,5.rar}"

# IE10 Win8
curl -O "https://az412801.vo.msecnd.net/vhd/IEKitV1_Final/VirtualBox/OSX/IE10_Win8/IE10.Win8.For.MacVirtualBox.part{1.sfx,2.rar,3.rar}"
```


### 12. Download a base Ubuntu box for Vagrant

I'm using [Vagrant](http://www.vagrantup.com/) to setup a few VMs locally for
development.

The Ubuntu image takes ~2h to download since vagrant server is slow (~50Kb/s),
might be faster to download the iso from the [Ubuntu
site](http://www.ubuntu.com/download/server) and mount the image by yourself.

```sh
# Ubuntu 12.04 LTS 64-bits
vagrant box add precise64 http://files.vagrantup.com/precise64.box
```


### 13. Profit!
