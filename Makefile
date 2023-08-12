# Install all required modules
install:
	cd client && pnpm install && cd ../server && composer install

# Create a production build
up-prod:
	docker-compose up --build -d

# Start in development mode
up:
	docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml up --build

# Stop all running containers without removing them
stop:
	docker-compose stop

# Start all existing containers
start:
	docker-compose start

# Stop containers and remove containers, networks, volumes, and images created by 'up-prod' or 'up'
down:
	docker-compose down --rmi all -v

# Run linter for client
lint-client:
	cd client && pnpm lint

# Fix lint errors for client
lint-client-fix:
	cd client && pnpm lint --fix

# Run linter for server
lint-server:
	cd server && ./vendor/bin/pint --test

# Fix lint errors for server
lint-server-fix:
	cd server && ./vendor/bin/pint -v

# Run linters for client & server
lint:
	cd client && pnpm lint && cd ../server && ./vendor/bin/pint --test

# Fix lint errors for client & server
lint-fix:
	cd client && pnpm lint --fix && cd ../server && ./vendor/bin/pint -v
