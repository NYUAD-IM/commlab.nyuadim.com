# Website for https://commlab.nyuadim.com

To make changes on your local machine:
- clone this repository
- make your changes on your computer
- commit on your computer
- push to GitHub
- ssh into commlab.nyuad.im
- git pull to get the changes onto the webserver

To make changes directly on the server:
- get your changes onto commlab.nyuadim.com
- ssh into commlab.nyuadim.com
- git commit your changes
- git push to push your changes to GitHub

Changes here need to be manually pulled to the webserver with e.g.
```
$ ssh <user>@commlab.nyuadim.com
$ cd commlab.nyuadim.com
$ git pull
```

To log into commlab.nyuadim.com without a password you should add your
ssh private key to commlab.nyuadim.com:~/.ssh/authorized_keys

Recommended to use ssh-agent and add the following to .ssh/config
```
Host commlab
     Hostname commlab.nyuadim.com
     User <user>
     ForwardAgent Yes
```

## TODO
- automatically push changes to website on GitHub commit
