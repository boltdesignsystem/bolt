---
title: Bolt Quick Start Guide
---

## Install Suggested Apps

1. Install the iTerm2 app: https://www.iterm2.com/
2. Next, install oh-my-zsh: https://github.com/robbyrussell/oh-my-zsh#basic-installation
```bash
# Paste this into iTerm
sh -c “$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)”
```
3. Install the SourceTree app: https://www.sourcetreeapp.com/
4. Install the VS Code app: https://code.visualstudio.com/



## Install Dependencies

1. Install Homebrew: https://brew.sh/
```bash
/usr/bin/ruby -e “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)”
```

2. Install Git
```bash
brew install git
```

3. Install NodeJS and NPM:
```bash
brew install nvm

# Once that finishes, create NVM's working directory if it doesn't exist
mkdir ~/.nvm      

# Add the following lines to your ~/.zshrc file:
echo 'export NVM_DIR="$HOME/.nvm"
  . "/usr/local/opt/nvm/nvm.sh"' >> ~/.zshrc
  
  
###
# Pro Tip: Need a little help adding these 2 lines to your `.zshrc` file?

1. Make sure to highlight and copy the code snippet above ^ to your clipboard ( CMD + C )
2. Edit your `.zshrc` file by typing in the following into iTERM and hitting enter: 

nano ~/.zshrc

3. Next, go to the very bottom to your .zshrc config file by pressing CONTROL + V a few times to quickly jump to the bottom of the file.

4. Then, hit enter to give yourself a little breathing room and go ahead and paste in the two lines copied from earlier ( CMD + V)

5. Finally, save and exit by pressing CONTROL + X, Hitting Y, then pressing enter to comform overwriting your .zshrc file

###



  
# restart shell
source ~/.zshrc

# finish installing nvm
nvm install lts/carbon # v8.9 +
nvm alias default lts/carbon
```

4. Install PHP and PHP Dependencies
```bash
brew install php72
brew tap homebrew/homebrew-php
brew install composer
composer global require hirak/prestissimo
```

5. Install GD and Imagick (used for generating responsive images in the build process)
```bash
brew install imagemagick
brew install graphicsmagick
```

6. Finally, install Yarn
```bash
brew install yarn
```


## Pulling Down, Installing and Running Bolt Locally

1. In iTerm, create a `sites` folder on your machine if you don't already have one created.
```bash
cd ~/
mkdir sites
cd sites
```

2. Now, clone down the Bolt repo locally (which will be located in your `~/sites/bolt` folder):
```bash
git clone https://github.com/bolt-design-system/bolt.git
```

3. Once the code has finished being cloned, in iTerm, change your working directory to be at the root of the Bolt codebase
```bash
cd bolt
```

4. Now, run the setup command which will do all the necessary installs for running the docs site and Pattern Lab environments locally, set up the build tools, install PHP dependencies, etc. Note: this'll take a couple mins probably the first time you need to run it - it gets faster during subsequent runs!
```bash
yarn # so Lerna bootstrap works
npm run setup
```

5. Finally, assuming you didn't get any errors during Step 4, you should be able to `cd` into the `apps/pattern-lab` folder to get the code to compile, watch for changes, start up a local dev server, etc.
```bash
cd apps/pattern-lab
npm start
```
