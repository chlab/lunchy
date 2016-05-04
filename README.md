# Lunchy

This is an over-engineered little web app that helps you find out what to eat for lunch.
It's also an excuse to play around with Django, ReactJS and ES6.

## Setup

### System Requirements
* Python
* Pip
* MySQL
* Setup a database (utf8) and user

### Installation
Note: you probably want to do this in a virtualenv

1. `git clone git@github.com:chlab/lunchy.git && cd lunchy`
2. `make install`
3. Rename `lunchy/lunchy/settings_secret.py.template` to `settings_secret.py` and adjust parameters accordingly
4. `make run`
5. You should now be able to access the app at http://127.0.0.1:8000/