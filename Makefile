TIMESTAMP := $(shell date +"%Y%m%dT%H%M%S")
BACKUP_FILE := "quirksmode-local-$(TIMESTAMP).zip"

.PHONY: help
help: ## print this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: build
build: ## build production version of the UI
	@echo "+ Build Production UI"
	@./bin/build

.PHONY: watch
watch: ## build development version of UI and watch files
	@echo "+ Build Development UI and watch files"
	@./bin/watch

.PHONY: ui
ui: ## build development version of UI and watch files
	@echo "+ Build Development UI and watch files"
	@./bin/watch

.PHONY: up
up: ## start WordPress, Backend and UI services
	@echo "+ Start WordPress, Backend and UI services"
	@./bin/up

.PHONY: stop
stop: ## stop WordPress and backend services
	@echo "+ Stop WordPress and backend services"
	@docker-compose stop

.PHONY: rebuild
rebuild: ## rebuild Docker images and services
	@echo "+ Rebuild Docker images and services"
	@./bin/rebuild

.PHONY: lint
lint: ## lint UI code
	@echo "+ Lint UI code"
	@cd ui && npm run lint

.PHONY: regenerate
regenerate: up ## regenerate all CMS thumbnails
	@echo "+ Regenerate all CMS thumbnails"
	@docker-compose exec wp media regenerate --yes --allow-root
