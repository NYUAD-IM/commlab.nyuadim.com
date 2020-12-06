# Website for https://commlab.nyuadim.com

To make changes:
- clone this repository
- make your changes on your computer
- commit on your computer
- push to GitHub
- ssh into commlab.nyuad.im
- git pull to get the changes onto the webserver

Changes here need to be manually pulled to the webserver with e.g.
```
$ ssh <user>@commlab.nyuadim.com
$ cd commlab.nyuadim.com
$ git pull
```

Recommended to use ssh-agent and add following to .ssh/config
```
Host commlab
     Hostname commlab.nyuadim.com
     User <user>
     ForwardAgent Yes
```

## TODO
- automatically push changes to website on GitHub commit
