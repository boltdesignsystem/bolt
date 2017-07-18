#!/bin/sh

# Homebrew Installer for OSX
# Installs Homebrew if not already installed + dependencies for things self-signed
# SSL certs for local HTTPS + HTTP2 + libs for responsive images.
# https://www.npmjs.com/package/devcert

HOMEBREW_DEPENDENCIES="nss imagemagick graphicsmagick wget"
UNAMESTR=`uname`




#
# Exit if not OS X (for now at least)
#
if [[ ! $UNAMESTR == "Darwin" ]]; then
  echo "Homebrew not installed. Non-OSX OS detected."
  exit 1
fi




#
# Install homebrew if not already installed
#
which -s brew
if [[ $? != 0 ]] ; then
  echo "Installing brew..."
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

  echo "Installing brew cask..."
  brew install caskroom/cask/brew-cask
else
  echo "Homebrew already installed."
fi




#
# Auto install missing dependencies listed above
#
for pkg in "${HOMEBREW_DEPENDENCIES[@]}"; do
  if brew list -1 | grep -q "^${pkg}\$"; then
    echo "Package '$pkg' is already installed. Skipping."
  else
    echo "Package '$pkg' is not installed. Installing..."
    brew install $pkg;
  fi
done



# if brew ls --versions myformula > /dev/null; then
#   # The package is installed
# else
#   # The package is not installed
# fi


# if !which brew then
#   # The package is installed
#   ## Continuing...
# else
  # The package is not installed





# # Self-sign SSL Certs for local HTTPS + HTTP2
# # https://www.npmjs.com/package/devcert
# brew install nss
#
#
# # Image optimization libraries - used for responsive image resizing
# brew install imagemagick
# brew install graphicsmagick


# Dev Tools (Optional)
# brew install git
# brew cask install atom
