# concat-tv

> The .concat() IPTV service

## What it does

* Parse M3U playlists and extracts channels from it
* Automatically check and mark channels if up/down
* Custom playlist management and export
* Collaborative editing

## Getting started

### Mac/Linux

```bash
./bin/up
./bin/start
```

### Windows

Follow instructions in [./bin/up.ps1](./bin/up.ps1).

```pwsh
./bin/up.ps1
./bin/start.ps1
```

#### Additional setup for Docker Toolbox (Windows 10 Home):
Look for every `localhost` in the database config files (`cable.yml` and `database.yml`) and replace it with the IP address of the docker-machine (e.g. `192.168.99.100`). You can find this IP address with following command: 

```
docker-machine ip
```

### Result

Open [http://localhost:5000](http://localhost:5000). You should see this:

![Setup success](./docs/assets/setup.png)

## Mandatory

* [Ruby 2.7](https://www.ruby-lang.org/en/)
* [Docker](https://www.docker.com/products/docker-desktop) and docker-compose
* [Homebrew](https://brew.sh/)

## Recommended

* [Postico](https://eggerapps.at/postico/) or similar database GUI's
* Evergreen browser (Chrome, Firefox, …)
