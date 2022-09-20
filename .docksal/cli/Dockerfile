FROM docksal/cli:php7.4-3.2

RUN apt-get update --allow-releaseinfo-change && \
    apt-get install -y python2 automake

RUN alias python=/usr/bin/python2

# All further commands will be performed as the docker user.
USER docker

# Install additional global npm dependencies
RUN \
    # Initialize nvm environment
    . $HOME/.profile && \
    nvm install 14.18.1 && \
    nvm alias default 14.18.1

# IMPORTANT! Switching back to the root user as the last instruction.
USER root
