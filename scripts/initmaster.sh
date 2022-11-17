#!/bin/bash

# Print functions with colors
printgr() { printf "\n\033[0;32m%s\033[0m\n" "$@"
} # GREEN

printrd() { printf "\n\033[0;31m%s\033[0m\n" "$@"
} # RED

printgr "Master node initialization started"
printrd "You have to run init.sh before this script."
read -p "Continue? (y/N) " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    printrd "Exiting"
    exit 1
fi

printgr "Continuing initialization process"

lsmod | grep br_netfilter

# Enable kubelet service
sudo systemctl enable kubelet

printgr "Pull configuration images"

sudo kubeadm config images pull

printgr "Initializing kubeadm"
printf "Please enter pod network cidr.\n"
printf "Example: 192.168.0.0/16\n"
read -r -p 'CIDR (default 192.168.0.0/16): ' cidr
if [[ ! $cidr ]]
then
    cidr="192.168.0.0/24"
fi
if [[ ! $cidr =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}($|/(16|24))$ ]]
then
    printrd "CIDR INVALID!"
    printf "%s\n" "$cidr"
    exit 2
fi

printgr "Initializing with cidr: "
printf "%s\n" "$cidr"

sudo kubeadm init \
  --pod-network-cidr="$cidr" \
  --cri-socket unix:///run/containerd/containerd.sock

printgr "Initialized kubeadm!"
printrd "TAKE THE TOKEN AND HASH FROM ABOVE\!"

mkdir -p "$HOME"/.kube
sudo cp -f /etc/kubernetes/admin.conf "$HOME"/.kube/config
sudo chown "$(id -u)":"$(id -g)" "$HOME"/.kube/config

printgr "Cluster info:"

kubectl cluster-info

printgr "Adding network configuration (Calico)"

kubectl create -f https://docs.projectcalico.org/manifests/tigera-operator.yaml 
kubectl create -f https://docs.projectcalico.org/manifests/custom-resources.yaml

printgr "NODES:"
kubectl get nodes -o wide

printgr "Master node has been initialized!"
printrd "TAKE THE TOKEN AND HASH FROM ABOVE!"
