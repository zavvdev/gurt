## Requirements

- install docker
- install docker-compose
- install make

### Setup project

1. Configure .env.\* files
2. Open the terminal and go to `/etc` folder. Type `sudo nano hosts`. In opened file provide two host names for 127.0.0.1 ip address:<br/>
   `127.0.0.1 gurt.local.gg` - local<br/>
   `127.0.0.1 gurt.gg`- prod (you can replace with your production url)<br/>
   (For windows: `C:\Windows\System32\drivers\etc\hosts`)<br />
   Save the file.
3. Run `make install` to install packages.
4. Run `make up` to create and start a production build (`gurt.gg`).
5. Run `make up-local` to start in dev mode (`gurt.local.gg`).

## Commands:

### ✔ make install

Install all required modules

### ✔ make up

Start in production mode

### ✔ make up-local

Start locally

### ✔ make stop

Stop all running containers without removing them

### ✔ make start

Start all existing containers

### ✔ make restart

Restart all containers

### ✔ make down

Stop containers and remove containers, networks, volumes, and images created by 'up-prod' or 'up'

### ✔ make lint-client

Run linter for client

### ✔ make lint-client-fix

Fix lint errors for client

### ✔ make lint-server

Run linter for server

### ✔ make lint-server-fix

Fix lint errors for server

### ✔ make lint

Run linters for client & server

### ✔ make lint-fix

Fix lint errors for client & server

### ✔ make db-volume-clear

Clear database volume data
(Be careful! Use only when you need to switch to prod database locally for testing purpose)
