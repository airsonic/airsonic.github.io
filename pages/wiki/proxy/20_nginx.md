---
layout: wiki
title: Set up Nginx
permalink: /wiki/proxy/nginx/
---
## Setting up Nginx

Create a new virtual host file :

```
sudo nano /etc/nginx/sites-available/libresonic
```

Paste the following configuration in the virtual host file :
```nginx
# Redirect HTTP to HTTPS
server {
    listen      80;
    server_name example.com;
    return      301 https://$server_name$request_uri;
}

server {

    # Setup HTTPS certificates
    listen       443 default ssl;
    server_name  example.com;
    ssl_certificate      cert.pem;
    ssl_certificate_key  key.pem;

    # Proxy to the Libresonic server
    location /libresonic {
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header Host              $http_host;
        proxy_max_temp_file_size           0;
        proxy_pass                         http://127.0.0.1:4040;
        proxy_redirect                     http:// https://;
    }
}
```
You will need to make a couple of changes in the configuration file :
* Replace `exemple.com` with your own domain name.
* Be sure to set the right path to your `cert.pem` and `key.pem` files.
* Change `/libresonic` following your libresonic server path.
* Change `http://127.0.0.1:4040` following you libresonic server location and port.
> Note that you could only add the "location /libresonic" section to your existing configuration :
```nginx
# Proxy to the Libresonic server
location /libresonic {
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header Host              $http_host;
    proxy_max_temp_file_size           0;
    proxy_pass                         http://127.0.0.1:4040;
    proxy_redirect                     http:// https://;
}
```

Activate the host by creating a symbolic link between the sites-available directory and the sites-enabled directory :
```
sudo ln -s /etc/nginx/sites-available/libresonic /etc/nginx/sites-enabled/libresonic
```

Restart the Nginx service :
```
sudo systemctl restart nginx.service
```

Done !
