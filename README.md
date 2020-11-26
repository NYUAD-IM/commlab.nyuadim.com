# Website for https://commlab.nyuadim.com

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
