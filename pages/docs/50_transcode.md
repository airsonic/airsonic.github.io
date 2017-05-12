---
layout: docs
title: Setting up transcoding binaries
permalink: /docs/transcode/
---
#### About transcoding

Transcoders are used by Libresonic to convert media from their on disk format to a format that can be consumed by clients. This is done not only for compatibility but also to save bandwidth when dealing with heavier file types. For example, although your library might use the flac format, bandwidth can be saved by converting to mp3 before transmission.

#### Install the transcoder

##### On Debian 8

Add jessie-backports repo to your `source.list` file:
```
deb http://ftp.fr.debian.org/debian/ jessie-backports main contrib
```

Install ffmpeg package
```
sudo apt-get install ffmpeg -t jessie-backports
```

Create a `transcode` directory within your `LIBRESONIC_HOME` directory:
```
mkdir /var/libresonic/transcode
```

Within the `transcode` directory symlink to ffmpeg and verify correct permissions
```
cd transcode/
ln -s /usr/bin/ffmpeg
ls -alh
```
> Note : Ensure the files has the correct permissions.

##### On Ubuntu > 16.04

Install ffmpeg package
```
sudo apt-get install ffmpeg
```

Create a `transcode` directory within your `LIBRESONIC_HOME` directory:
```
mkdir /var/libresonic/transcode
```

Within the `transcode` directory symlink to ffmpeg and verify correct permissions
```
cd transcode/
ln -s /usr/bin/ffmpeg
ls -alh
```
> Note : Ensure the files has the correct permissions.

##### On Red Hat / Fedora
```
sudo yum install ffmpeg
```

Create a `transcode` directory within your `LIBRESONIC_HOME` directory:
```
mkdir /var/libresonic/transcode
```

Within the `transcode` directory symlink to ffmpeg and verify correct permissions
```
cd transcode/
ln -s /usr/bin/ffmpeg
ls -alh
```
> Note : Ensure the files has the correct permissions.

##### On Windows

Get the ffmpeg package from the project [download page](https://ffmpeg.zeranoe.com/builds/).

Unpack the files into the `LIBRESONIC_HOME/transcode/` folder.

##### On MacOS

You can install ffmpeg binaries on MacOS using `Homebrew` :
```
brew install ffmpeg
```

Create a `transcode` directory within your `LIBRESONIC_HOME` directory:
```
mkdir /var/libresonic/transcode
```

Within the `transcode` directory symlink to ffmpeg and verify correct permissions
```
cd transcode/
ln -s /usr/bin/ffmpeg
ls -alh
```
