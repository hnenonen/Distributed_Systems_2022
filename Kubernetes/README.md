# Kubernetes configurations

This directory contains configuration files for different services, deployments etc.

Directory `metallb` contains IP range configurations for different services. `metall2.yaml` is used to define external IP-address for front-end pods and `metallbe.yaml` for backend pods.

RabbitMQ configuration file `rabbitmq.yaml` is a bit modified version of [this](https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml).

Directories `frontend` and `backend` have configuration files for corresponding services and deployments.
