PROJECT_NAME=container

.PHONY: build up down clean logs

build:
	docker-compose -p $(PROJECT_NAME) build

up:
	docker-compose -p $(PROJECT_NAME) up -d

down:
	docker-compose -p $(PROJECT_NAME) down

clean: down
	docker system prune  -a -f --volumes

logs:
	docker-compose -p $(PROJECT_NAME) logs -f

exec:
	docker-compose -p $(PROJECT_NAME) exec -it $(SERVICE) $(cmd)
