-include .env

# BuildKit enables higher performance docker builds and caching possibility
# to decrease build times and increase productivity for free.
export DOCKER_BUILDKIT ?= 1
export COMPOSE_DOCKER_CLI_BUILD ?= 1

export SHARED_SERVICES_NETWORK = $(addsuffix _network,$(subst $e.,_,$(SHARED_SERVICES_NAMESPACE)))

# Binary to use, when executing docker-compose tasks
DOCKER_COMPOSE ?= docker-compose

# Support image with all needed binaries, like envsubst, mkcert, wait4x
SUPPORT_IMAGE ?= wayofdev/build-deps:alpine-latest

BUILDER_PARAMS ?= docker run --rm -i \
	--env-file ./.env \
	--env APP_NAME=$(APP_NAME) \
	--env SYSTEM_SERVICES_NAMESPACE=$(SYSTEM_SERVICES_NAMESPACE) \
	--env PROJECT_SERVICES_NAMESPACE=$(PROJECT_SERVICES_NAMESPACE) \
	--env SHARED_SERVICES_NETWORK=$(SHARED_SERVICES_NETWORK)

BUILDER ?= $(BUILDER_PARAMS) $(SUPPORT_IMAGE)

# Shorthand envsubst command, executed through build-deps
ENVSUBST ?= $(BUILDER) envsubst

APP_RUNNER ?= $(DOCKER_COMPOSE) run --rm --no-deps app
NPM_BIN ?= /bin/pnpm
NPM_RUNNER ?= $(APP_RUNNER) $(NPM_BIN)


# Self documenting Makefile code
# ------------------------------------------------------------------------------------
ifneq ($(TERM),)
	BLACK := $(shell tput setaf 0)
	RED := $(shell tput setaf 1)
	GREEN := $(shell tput setaf 2)
	YELLOW := $(shell tput setaf 3)
	LIGHTPURPLE := $(shell tput setaf 4)
	PURPLE := $(shell tput setaf 5)
	BLUE := $(shell tput setaf 6)
	WHITE := $(shell tput setaf 7)
	RST := $(shell tput sgr0)
else
	BLACK := ""
	RED := ""
	GREEN := ""
	YELLOW := ""
	LIGHTPURPLE := ""
	PURPLE := ""
	BLUE := ""
	WHITE := ""
	RST := ""
endif
MAKE_LOGFILE = /tmp/next-starter-tpl.log
MAKE_CMD_COLOR := $(BLUE)

default: all

help: ## Show this menu
	@echo 'Management commands for package:'
	@echo 'Usage:'
	@echo '    ${MAKE_CMD_COLOR}make${RST}                       Prepares and spins up project with default settings'
	@grep -E '^[a-zA-Z_0-9%-]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "    ${MAKE_CMD_COLOR}make %-21s${RST} %s\n", $$1, $$2}'
	@echo
	@echo '    📑 Logs are stored in      $(MAKE_LOGFILE)'
	@echo
	@echo '    📦 Package                 next-starter-tpl (github.com/wayofdev/next-starter-tpl)'
	@echo '    🤠 Author                  Andrij Orlenko (github.com/lotyp)'
	@echo '    🏢 ${YELLOW}Org                     wayofdev (github.com/wayofdev)${RST}'
.PHONY: help

.EXPORT_ALL_VARIABLES:


# Default action
# Defines default command when `make` is executed without additional parameters
# ------------------------------------------------------------------------------------
all: install hooks up
.PHONY: all


# System Actions
# ------------------------------------------------------------------------------------
env: ## Generate .env file from example, use `make env force=true`, to force re-create file
ifeq ($(FORCE),true)
	@echo "${YELLOW}Force re-creating .env file from example...${RST}"
	$(ENVSUBST) < ./.env.example > ./.env
else ifneq ("$(wildcard ./.env)","")
	@echo ""
	@echo "${YELLOW}The .env file already exists! Use FORCE=true to re-create.${RST}"
else
	@echo "Creating .env file from example"
	$(ENVSUBST) < ./.env.example > ./.env
endif
.PHONY: env

install:
	$(NPM_RUNNER) i
.PHONY: install

update:
	$(NPM_RUNNER) update
.PHONY: update

build:
	$(NPM_RUNNER) run build
.PHONY: build

purge: down
	rm -rf .pnpm-store node_modules **/node_modules pnpm-lock.yaml **/.turbo
.PHONY: purge


# Docker Actions
# ------------------------------------------------------------------------------------
up: ## Spin up this project using docker
	$(DOCKER_COMPOSE) up --remove-orphans -d
	@echo "🚀 Started and available at https://$(APP_NAME).$(PROJECT_SERVICES_NAMESPACE).docker"
.PHONY: up

down: ## Stops and removes all project containers
	$(DOCKER_COMPOSE) down --remove-orphans
.PHONY: down

restart: down up ## Removes containers and stops, then starts new instances
.PHONY: restart

clean:
	$(DOCKER_COMPOSE) rm --force --stop
.PHONY: clean

ps: ## Show running containers
	$(DOCKER_COMPOSE) ps
.PHONY: ps

logs: ## Show all project docker logs
	$(DOCKER_COMPOSE) logs -f
.PHONY: logs

ssh:
	$(DOCKER_COMPOSE) run --rm -it app sh
.PHONY: ssh

recreate:
	rm -rf .pnpm-store node_modules
	$(DOCKER_COMPOSE) build app
.PHONY: recreate


# Testing and Code Quality
# ------------------------------------------------------------------------------------
lint: ## Run eslint task
	# $(NPM_RUNNER) lint
	$(DOCKER_COMPOSE) exec -T app $(NPM_BIN) run lint
.PHONY: lint

lint-staged:
	$(DOCKER_COMPOSE) exec -T app $(NPM_BIN) run lint-staged
.PHONY: lint-staged

commitlint:
	$(DOCKER_COMPOSE) exec -T app npx --no --commitlint --edit $(1)
.PHONY: commitlint

test: ## Run unit tests
	$(DOCKER_COMPOSE) exec -T app $(NPM_BIN) run test
.PHONY: test

format: ## Run prettier formatting
	$(DOCKER_COMPOSE) exec -T app $(NPM_BIN) run format
.PHONY: format


# Yaml Actions
# ------------------------------------------------------------------------------------
ylint: ## Lints yaml files inside project
	yamllint .
.PHONY: ylint


# Git Actions
# ------------------------------------------------------------------------------------
hooks: ## Install git hooks from husky
	$(NPM_RUNNER) run prepare
.PHONY: hooks
