install-packages:	
	@ ${INFO} "Installing packages"
	@ ${INFO} "Installing backend packages"
	@ cd server && npm install
	@ ${INFO} "Installing frontend packages"
	@ cd client && npm install
	@ ${SUCCESS} "Installing packages"

start-backend:
	@ ${INFO} "Starting up backend server"
	@ ${INFO} "Running build"
	@ cd server && npm run build-ts
	@ ${INFO} "Starting app"
	@ cd server && npm start

start-frontend:
	@ ${INFO} "Starting up frontend app"
	@ ${INFO} "Starting app"
	@ cd client && npm start

test:
	@ ${INFO} "Running test cases"
	@ cd server && npm test

start-docker:
	@ docker-compose up --build

# COLORS
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
NC := "\e[0m"

# shell functions
INFO := @bash -c 'printf "\n"; printf $(YELLOW); echo "===> $$1"; printf "\n"; printf $(NC)' SOME_VALUE
SUCCESS := @bash -c 'printf "\n"; printf $(GREEN); echo "===> $$1"; printf "\n"; printf $(NC)' SOME_VALUE
