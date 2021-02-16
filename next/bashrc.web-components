# The following is the standard environment file for the LForms
# development team.
# You should explicitly source
# this first  and then do your own environment
# customizations.
#     You may set variables before sourcing this to change execution
# of it.

# Use the globally installed node and its modules
NODE_DIR=node-v10.14.1-linux-x64
# Set path
PATH=~/${NODE_DIR}/bin:/bin:/usr/local/bin:/usr/bin:/usr/sbin:/sbin:/etc

# Add node_modules/.bin to the path. We can find that from `npm bin`, but that
# takes a second or two, and slows things down.
script_dir=`dirname ${BASH_SOURCE}`
npm_bin=`readlink -f $script_dir/node_modules/.bin`
PATH=$PATH:$npm_bin

# Set node in development mode
unset NODE_ENV

# Set editor for git
export EDITOR=/usr/bin/vim

umask 022

# Set some things only if in an interactive shell
if [[ "$-" == *i* ]]
then

  # Maybe needed for CDE
  #stty erase ^H
  stty erase ^\?
fi
