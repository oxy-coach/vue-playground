ROOT_DIR=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
FRONT_DIR=$(ROOT_DIR)/frontend
BACK_DIR=$(ROOT_DIR)/backend

# установка зависимостей
install:
	@docker-compose run --rm server sh -c "yarn install"
	@docker-compose run --rm client sh -c "yarn install"

# запуск фронта и бекенда
serve:
	@docker-compose up server

# остановка контейнеров
stop:
	@docker kill $(docker ps -q)

