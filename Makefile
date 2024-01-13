ROOT_DIR=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
FRONT_DIR=$(ROOT_DIR)/frontend
BACK_DIR=$(ROOT_DIR)/backend

# установка зависимостей
install:
	@docker-compose run --rm server sh -c "yarn install"
	@docker-compose run --rm client sh -c "yarn install"

build:
	@docker-compose run --rm client sh -c "yarn build"

# запуск фронта и бекенда
serve:
	@docker-compose up client

# остановка контейнеров
stop:
	@docker kill $(docker ps -q)

