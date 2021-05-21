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

In order to bypass the password input every time you SSH to the webserver, you can use `ssh-copy-id` to copy your public ssh key to the server. To check if you already have an SSH key: `ls ~/.ssh/` and see if there's a file called `id_rsa`. If there isn't create one by typing:
```
$ ssh-keygen
```

Once you have an ssh key, you can copy it over to the webserver:
```

$ ssh-copy-id <user>@commlab.nyuadim.com
```

Done! you can now ssh with the lines above without having to input your password

## TODO
- automatically push changes to website on GitHub commit
