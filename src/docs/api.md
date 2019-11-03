---
title: API
---
## Airsonic API

Airsonic currenlty doesn't have its own API, but some work is made in order to modernize the project.

## Subsonic API

We will try not to break with the Subsonic API. Airsonic currently embed Subsonic API version 1.15.0.

Some features where removed or not integrated, so some endpoint of the API will return some errors:
- `getChatMessages` returns `410 Gone`
- `addChatMessage` returns `410 Gone`
- `getVideoInfo` returns `501 Not implemented`
- `getCaptions` returns `501 Not implemented`

If you want to use the API please find the [API documentation on the Subsonic website](http://www.subsonic.org/pages/api.jsp).

### Generate a Subsonic API token

::: tip
This is and extension of the [original subsonic API documentation](http://www.subsonic.org/pages/api.jsp) regarding token authentication.
:::

In order to work with the Subsonic API, we recommend the token and salt as authentication system, instead of using your password in plain text.

::: tip NOTE
Using md5 as hashing algorithm for authentication is a subsonic API limitation, and it isn't recommended in modern authentication system.
:::

First you need to generate a salt string, with a minimal length of 10 chars, using one of the following command:

```sh
openssl rand -base64 10
openssl rand -hex 10
head /dev/urandom | tr -dc A-Za-z0-9 | head -c 10 ; echo
```

The token is generated using the md5sum of your password concatenated to the previous salt string `token = md5(password + salt)`. Use the following command to generate the token:

```sh
echo -n <password><salt> | md5sum | awk '{ print $1 }')
```

::: tip
The awk command is using to remove the md5 source name from the output, in our case from stdin `-`.
:::

You can now pass your username, the token and salt to your api requests:
```sh
curl 'http://your-server/rest/ping.view?u=<username>&t=<token>&s=<salt>&v=1.15.0&c=<your-app>'
```

Here is a full example:
```sh
SERVER='https://example.tld'
CLIENT='CLI'
USERNAME='admin'
PASSWORD='password'
SALT="$(openssl rand -hex 20)"
TOKEN="$(echo -n "${PASSWORD}${SALT}" | md5sum | awk '{ print $1 }')"
echo ${SALT}
echo ${TOKEN}
curl "${SERVER}/rest/ping.view?u=${USERNAME}&t=${TOKEN}&s=${SALT}&v=1.15.0&c=${CLIENT}"
```
