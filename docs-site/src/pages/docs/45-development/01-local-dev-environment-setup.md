---
title: Local Dev Environment Setup
---

## Install Suggested Apps

1. Install the iTerm2 app: https://www.iterm2.com/
2. Next, install oh-my-zsh: https://github.com/robbyrussell/oh-my-zsh#basic-installation
```bash
# Paste this into iTerm
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
3. Install the SourceTree app: https://www.sourcetreeapp.com/
4. Install the VS Code app: https://code.visualstudio.com/



## Install Dependencies

### 1. Install Homebrew: https://brew.sh/
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### 2. Install Git
```bash
brew install git
```

### 3. Install NodeJS and NPM (via NVM)
```bash
brew install nvm
```

Once that finishes, create NVM's working directory (if it doesn't exist)
```bash
mkdir ~/.nvm
```

Now update your ~/.zshrc config by pasting in the following to iTerm:
```
echo 'export NVM_DIR="$HOME/.nvm"
  . "/usr/local/opt/nvm/nvm.sh"' >> ~/.zshrc
```

<details>
  <summary>Pro Tip: Need a little help adding those 2 lines to your `.zshrc` config file?</summary>
  <p>Did that previous command not automatically update your config file for some reason?</p>
  <ol>
    <li>Make sure to highlight and copy the code snippet above ^ to your clipboard ( CMD + C )</li>
    <li>Edit your <code>.zshrc</code> file by typing in the following into iTERM and hitting enter: <code>nano ~/.zshrc</code>
    <li>Next, go to the very bottom to your .zshrc config file by pressing CONTROL + V a few times to quickly jump to the bottom of the file.</li>
    <li>Then, hit enter to give yourself a little breathing room and go ahead and paste in the two lines copied from earlier ( CMD + V)</li>
    <li>Finally, save and exit by pressing CONTROL + X, Hitting Y, then pressing enter to comform overwriting your .zshrc file</li>
</ol>
</details>
<br>

Next, with your `.zshrc` config updated, restart your iTerm instance:
```bash
source ~/.zshrc
```

Finally, finish installing nvm: 
```
nvm install lts/carbon # v8.9 +
nvm alias default lts/carbon
```

### 4. Install PHP and PHP Dependencies
```bash
brew install php72
```

After upgrading PHP, be sure to restart your iTerm instance. Otherwise, an old PHP version may still be linked, and composer will install mismatched packages.
#### Attention PHP 7.3 users
In you are using PHP 7.3 you will must update yours `php.ini` and disable PHP PCRE JIT compilation by replacing this line:
```bash
;pcre.jit=1
```
to
```bash
pcre.jit=0
```

> Note: PHP 7.1 is technically fine if that's what you already have pre-installed.

```
brew install composer
composer global require hirak/prestissimo
```

### 5. Install GD and Imagick (used for generating responsive images in the build process)
```bash
brew install imagemagick
brew install graphicsmagick
```

### 6. Finally, install Yarn
```bash
brew install yarn
```

> Pro Tip: Already have Yarn installed? 
Awesome! Make sure you're running the latest version by running `brew update yarn`


## Pulling Down, Installing and Running Bolt Locally

1. In iTerm, create a `sites` folder on your machine if you don't already have one created.
```bash
cd ~/
mkdir sites
cd sites
```
2. Now, clone down the Bolt repo locally (located in your `~/sites/bolt` folder):
```bash
git clone https://github.com/bolt-design-system/bolt.git
```

3. Once the code has finished being cloned, in iTerm, change your working directory to be at the root of the Bolt codebase
```bash
cd bolt
```

4. Now, run the `setup` npm script command.

```bash
npm run setup
```

This performs all the setup and install tasks needed to run the Bolt docs and Pattern Lab environments locally. Note: this'll probably take a couple minutes to run the very first time without having anything pre-installed or cached locally. It's much faster subsequently!

5. Finally, assuming you didn't get any errors during Step 4, you should be able to `cd` into the `apps/pattern-lab` folder to get the code to compile, watch for changes, start up a local dev server, etc.
```bash
cd docs-site
npm start
```

> Note: seeing an error after running the `npm start` command? Try clearing out your local dependencies by running `npm run clean` from the root of the repo and try running through the `npm run setup` and `npm start` commands. 
>
> If you're still seeing issues, let us know!
