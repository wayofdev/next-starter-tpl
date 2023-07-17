-include .env

# BuildKit enables higher performance docker builds and caching possibility
# to decrease build times and increase productivity for free.
export DOCKER_BUILDKIT ?= 1
export COMPOSE_DOCKER_CLI_BUILD ?= 1

export SHARED_SERVICES_NETWORK = $(addsuffix _network,$(subst $e.,_,$(SHARED_SERVICES_NAMESPACE)))

# https://github.com/vercel/turbo/issues/223
export FORCE_COLOR ?= 1

# Binary to use, when executing docker-compose tasks
DOCKER_COMPOSE ?= docker-compose

# Support image with all needed binaries, like envsubst, mkcert, wait4x
SUPPORT_IMAGE ?= wayofdev/build-deps:alpine-latest

BUILDER_PARAMS ?= docker run \
 	--rm \
 	-i \
 	-v $(PWD):/app \
 	--workdir /app \
	--env-file ./.env \
	--env APP_NAME=$(APP_NAME) \
	--env SYSTEM_SERVICES_NAMESPACE=$(SYSTEM_SERVICES_NAMESPACE) \
	--env PROJECT_SERVICES_NAMESPACE=$(PROJECT_SERVICES_NAMESPACE) \
	--env SHARED_SERVICES_NETWORK=$(SHARED_SERVICES_NETWORK)

BUILDER ?= $(BUILDER_PARAMS) $(SUPPORT_IMAGE)

# Shorthand envsubst command, executed through build-deps
ENVSUBST ?= $(BUILDER) envsubst

APP_RUNNER ?= $(DOCKER_COMPOSE) run --rm --no-deps -e FORCE_COLOR=1 app
NPM_BIN ?= /bin/pnpm
NPM_RUNNER ?= $(APP_RUNNER) $(NPM_BIN)
NPM_COMPOSE_RUNNER ?= $(DOCKER_COMPOSE) exec -T -e FORCE_COLOR=1 app $(NPM_BIN) run


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
all: install hooks
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

i: ## Install dependencies
	$(NPM_RUNNER) i
.PHONY: i

install: i ## Same as `make i`
.PHONY: install

update: ## Run pnpm to packages to their latest version based on the specified range
	$(NPM_RUNNER) update
.PHONY: update

purge: down ## Stops container and deletes node modules and temporary files
	find . | grep /node_modules$ | grep -v /node_modules/ | xargs rm -fR
	find . | grep /.turbo$ | grep -v /.turbo/ | xargs rm -fR
	find . | grep /.next$ | grep -v /.next/ | xargs rm -fR
	rm -rf .pnpm-store pnpm-lock.yaml
.PHONY: purge

deps-check: ## Check for outdated dependencies
	$(NPM_RUNNER) run deps:check
.PHONY: deps-check

deps-update: ## Check for outdated dependencies and automatically update them using pnpm
	$(NPM_RUNNER) run deps:update
.PHONY: deps-update


# Docker Actions
# ------------------------------------------------------------------------------------
up: ## Spin up this project using docker
	$(DOCKER_COMPOSE) up --remove-orphans
	@echo "🚀 Started and available at https://$(APP_NAME).$(PROJECT_SERVICES_NAMESPACE).docker"
.PHONY: up

down: ## Stops and removes all project containers
	$(DOCKER_COMPOSE) down --remove-orphans
.PHONY: down

restart: down up ## Removes containers and stops, then starts new instances
.PHONY: restart

clean: ## Stops and removes docker containers, specified int docker-compose.yml
	$(DOCKER_COMPOSE) rm --force --stop
.PHONY: clean

ps: ## Show running containers
	$(DOCKER_COMPOSE) ps
.PHONY: ps

logs: ## Show all project docker logs
	$(DOCKER_COMPOSE) logs -f
.PHONY: logs

ssh: ## Login into running app container
	$(DOCKER_COMPOSE) run --rm -it app sh
.PHONY: ssh

recreate: purge ## Delete dependencies and re-create docker container
	$(DOCKER_COMPOSE) build app
.PHONY: recreate

pull: ## Pull latest docker image from docker hub for app container
	$(DOCKER_COMPOSE) pull app
.PHONY: pull

docs-up: ## Spin up docs container
	$(DOCKER_COMPOSE) up -d docs
.PHONY: docs-up

docs-down: ## Stop and remove docs container
	$(DOCKER_COMPOSE) down docs
.PHONY: docs-down

docs-restart: ## Restart docs container
	$(DOCKER_COMPOSE) restart docs
.PHONY: docs-restart

web-up: ## Spin up app container
	$(DOCKER_COMPOSE) up -d app
.PHONY: web-up

web-down: ## Stop and remove app container
	$(DOCKER_COMPOSE) down app
.PHONY: web-down

web-restart: ## Restart app container
	$(DOCKER_COMPOSE) restart app
.PHONY: web-restart

storybook-up: ## Spin up storybook container
	$(DOCKER_COMPOSE) up -d storybook
.PHONY: storybook-up

storybook-down: ## Stop and remove storybook container
	$(DOCKER_COMPOSE) down storybook
.PHONY: storybook-down

storybook-restart: ## Restart storybook container
	$(DOCKER_COMPOSE) restart storybook
.PHONE: storybook-restart


# Testing and Code Quality
# ------------------------------------------------------------------------------------
lint: ## Run lint task to fix issues
	# $(NPM_RUNNER) lint
	$(NPM_RUNNER) lint:fix
.PHONY: lint

lint-types: ## Run typescript type checking
	$(NPM_RUNNER) lint:types
.PHONY: lint-types

lint-staged: ## Lint staged files
	$(NPM_RUNNER) lint:staged
.PHONY: lint-staged

lint-commits: ## Run commitlint to check commit message
	$(DOCKER_COMPOSE) exec -T -e FORCE_COLOR=1 app npx --no --commitlint --edit $(1)
.PHONY: lint-commits

lint-md: ## Lint markdown files
	$(NPM_RUNNER) lint:md
.PHONY: lint-md

lint-dist:
	$(NPM_RUNNER) lint:dist
.PHONY: lint-dist

lint-html: ## Lint html files
	$(NPM_RUNNER) lint:html
.PHONY: lint-html

lint-css: ## Lint css files
	$(NPM_RUNNER) lint:css
.PHONY: lint-css

lint-secrets: ## Check if there are any missed secret credentials in code
	$(NPM_RUNNER) lint:secrets
.PHONY: lint-secrets

lint-browsers: ## Lint browserslist
	$(NPM_RUNNER) lint:browsers
.PHONY: lint-browsers

lint-yaml: ## Lints yaml files inside project
	yamllint .
.PHONY: lint-yaml

lint-actions: ## Lint github actions using actionlint
	$(BUILDER) actionlint -color
.PHONY: lint-actions

test: ## Run unit tests
	$(NPM_RUNNER) test:unit
.PHONY: test

test-e2e: ## Run e2e tests
	npx playwright install
	pnpm --filter=web test:e2e
.PHONY: test-e2e

format: ## Run prettier formatting
	$(NPM_RUNNER) format
.PHONY: format

sort: ## Sort package.json across project
	$(NPM_RUNNER) lint:package-json
.PHONY: sort

analyze: ## Run bundle-analyzer
	pnpm --filter=web analyze
.PHONY: analyze


# Building components
# ------------------------------------------------------------------------------------
build: ## Build all apps and packages inside monorepo
	$(NPM_RUNNER) build
.PHONY: build

build-web: ## Build web app
	$(NPM_RUNNER) build:web
.PHONY: build-web

build-docs: ## Build docs app
	$(NPM_RUNNER) build:docs
.PHONY: build-docs

build-storybook: ## Build storybook app
	$(NPM_RUNNER) build:storybook
.PHONY: build-storybook

build-ui: ## Build ui package
	$(NPM_RUNNER) build:ui
.PHONY: build-ui


# Release
# ------------------------------------------------------------------------------------
cs: ## Run changeset to generate changelog
	npx changeset
.PHONY: cs

cs-version: ## Bump version of packages
	npx changeset version
.PHONY: version

cs-release: ## Publish new version to npm
	npx changeset release
.PHONY: release

cs-publish: ## Run build, lint tasks and then publish new version to npm
	npx changeset publish
.PHONY: release


# Git Actions
# ------------------------------------------------------------------------------------
hooks: ## Install git hooks from husky
	$(NPM_RUNNER) run prepare
.PHONY: hooks
