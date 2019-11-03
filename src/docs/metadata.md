---
layout: docs
title: Supporting additional metadata
permalink: /docs/metadata/ffprobe/
---
For some file types (currently only video files), Airsonic can use an external
program to learn about the file's contents when it otherwise would be unable to.
The program used for this is `ffprobe`.

Airsonic will search for an `ffprobe` binary in your `transcode` directory and
if it does not exist will search the paths configured in your system via the
`PATH` environment variable. If you have installed a version of ffmpeg as
[recommended for the transcoder](/docs/transcode/), no additional setup should
be required because most distributions of ffmpeg include the `ffprobe` utility.

You can test whether additional setup is required by trying to run `ffprobe`
yourself:

```
$ ffprobe -version
ffprobe version 3.3.4 Copyright (c) 2007-2017 the FFmpeg developers
...
libavutil      55. 58.100 / 55. 58.100
libavcodec     57. 89.100 / 57. 89.100
libavformat    57. 71.100 / 57. 71.100
libavdevice    57.  6.100 / 57.  6.100
libavfilter     6. 82.100 /  6. 82.100
libavresample   3.  5.  0 /  3.  5.  0
libswscale      4.  6.100 /  4.  6.100
libswresample   2.  7.100 /  2.  7.100
libpostproc    54.  5.100 / 54.  5.100
```

If you don't get output like that, you should get a copy of ffprobe for your
operating system and place it in Airsonic's `transcode` directory.
