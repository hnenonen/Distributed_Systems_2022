#!/bin/bash

# Print functions with colors
printgr() { printf "\n\033[0;32m%s\033[0m\n" "$@"
}

printrd() { printf "\n\033[0;31m%s\033[0m\n" "$@"
}

printgr "Initialization started of Kubernetes node"

sudo apt update
sudo apt -y install curl apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt update
sudo apt -y install vim git curl wget kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

printgr "Kubernetes packages installed"

kubectl version --client && kubeadm version

sudo swapoff -a
sudo mount -a
free -h

printrd "Check line above for free command output"
printgr "Swap turned off"

sudo modprobe overlay
sudo modprobe br_netfilter

sudo tee /etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

sudo sysctl --system

printgr "System reloaded"

sudo tee /etc/modules-load.d/containerd.conf <<EOF
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

sudo tee /etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

sudo sysctl --system

printgr "System reloaded second time"

sudo apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt update
sudo apt install -y containerd.io

printgr "Installed containerd"

sudo mkdir -p /etc/containerd
sudo sh -c 'containerd config default>/etc/containerd/config.toml'

printgr "Configured containerd"

sudo systemctl restart containerd
sudo systemctl enable containerd

printgr "Started containerd" "For more information run:"
printf "sudo systemctl status containerd \n"
printgr "Node has been initialized"
printrd "You have to connect to master node manually\!" "Run:"
printf "%s\n" "kubeadm join 192.168.1.14:6443 --token TOKEN \\" "    --discovery-token-ca-cert-hash HASH"
