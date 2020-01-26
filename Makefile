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

.PHONY: cms
cms: ## start WordPress and Backend services
	@echo "+ Start WordPress and Backend services"
	@./bin/cms

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

.PHONY: setup-hosts
setup-hosts: ## set up local development hostnames
	@echo "+ Set up local development hostnames"
	@./bin/setup-hosts

.PHONY: activate-plugins
activate-plugins: up ## activate WordPress plugins
	@echo "+ Activate WordPress plugins"
	@./bin/activate-plugins

.PHONY: update-plugins
update-plugins: up ## update all WordPress plugins
	@echo "+ Update all WordPress plugins"
	@./bin/wp plugin update --all

.PHONY: scan
scan: up ## security scan local WordPress environment
	@echo "+ Scan local WordPress environment"
	@./bin/wpscan local

.PHONY: logs
logs: up ## show WordPress service logs
	@echo "+ Show WordPress service logs"
	@docker-compose logs -f wordpress

.PHONY: regenerate
regenerate: up ## regenerate all CMS thumbnails
	@echo "+ Regenerate all CMS thumbnails"
	@docker-compose exec wp media regenerate --yes --allow-root
