<!--
# README.md
# airsonic/airsonic
-->
# Airsonic Website

This is the [Airsonic website](https://airsonic.github.io/) repo.

## Getting started

- Clone the website repo `git clone https://github.com/airsonic/airsonic.github.io`.
- Change directory into the cloned repo `cd airsonic.github.io`.
- Clone the documentation submodule `git clone https://github.com/airsonic/airsonic-docs docs`.
- For the next steps, go one directory up `cd ..`
- Install `ruby` with the devkit. If you run it on Windows, don't install it to `C:\Program Files` as you will get trouble with the space later!
- Install [`bundler`](https://bundler.io/) (`gem install bundler`).
- Install [`jekyll`](https://jekyllrb.com/) (`gem install jekyll`).
- Update local dependencies: `bundler update`.
- Install local dependencies: `bundler install`.
- Run `bundler exec jekyll serve --watch`.

The above wrapped into a little script (it assume you have bundler installed):
```sh
git clone https://github.com/airsonic/airsonic.github.io && \
cd airsonic.github.io && \
git clone https://github.com/airsonic/airsonic-docs docs && \
bundler install
```

## Contributing

Please see [this guide](https://github.com/airsonic/airsonic-docs/blob/master/.github/CONTRIBUTING.md) for any contribution.

Use _update_submodule.sh_ to update the submodule [docs](https://github.com/airsonic/airsonic-docs).

### Media sources

- [Main page background picture](https://airsonic.github.io/img/album-wall.jpg) is distributed under Creative Commons 2.0 license. All right reserved to __Heath Alseike__ for his pictures available on [flickr](https://www.flickr.com/photos/99624358@N00/5506222889/).__Really nice album wall picture by the way !__
