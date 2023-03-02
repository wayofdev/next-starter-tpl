#!/bin/bash

# Load environment variables from .env file
if [[ -f .env ]]; then
  source .env
fi

# Set network name for container
SHARED_SERVICES_NETWORK=${SHARED_SERVICES_NAMESPACE//./_}_network
export SHARED_SERVICES_NETWORK

# Set Docker BuildKit and Compose Docker CLI Build flags
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Run command in container
docker-compose run --rm --no-deps \
  -e FORCE_COLOR=1 \
  -e SHARED_SERVICES_NETWORK \
  app /bin/pnpm "$@"
