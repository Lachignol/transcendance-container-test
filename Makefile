PROJECT_NAME=container
SERVICE=app
CMD=sh

.PHONY: build up down clean logs exec

build:
	docker compose --project-name $(PROJECT_NAME) build

up:
	docker compose --project-name $(PROJECT_NAME) up -d

down:
	docker compose --project-name $(PROJECT_NAME) down

clean: down
	docker system prune -a -f --volumes

logs:
	docker compose --project-name $(PROJECT_NAME) logs -f

exec:
ifndef SERVICE
	$(error SERVICE n'est pas défini)
endif
ifndef CMD
	$(error CMD n'est pas défini)
endif
	docker compose --project-name $(PROJECT_NAME) exec -it $(SERVICE) $(CMD)

