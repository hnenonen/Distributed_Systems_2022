# Some kind of architecture document



```
$ kubectl get all --all-namespaces
NAMESPACE              NAME                                             READY   STATUS      RESTARTS      AGE
default                pod/dep-79b8464fd9-jfzh4                         1/1     Running     0             7d23h
default                pod/hello-world-server-0                         0/1     Pending     0             18h
default                pod/resource-limits-server-0                     1/1     Running     0             24h
default                pod/server-dep-5c577b6465-hxq6g                  1/1     Running     0             24h
default                pod/testapp-5dc5956cdb-tq9jx                     1/1     Running     0             18h
default                pod/testapp-5dc5956cdb-xjj8j                     1/1     Running     0             18h
ingress-nginx          pod/ingress-nginx-admission-create-9l5t7         0/1     Completed   0             23h
ingress-nginx          pod/ingress-nginx-admission-patch-w8dtd          0/1     Completed   1             23h
ingress-nginx          pod/ingress-nginx-controller-8574b6d7c9-799m6    1/1     Running     0             23h
kube-system            pod/calico-kube-controllers-798cc86c47-bg7tk     1/1     Running     0             7d23h
kube-system            pod/calico-node-8mwdg                            1/1     Running     0             7d23h
kube-system            pod/calico-node-tqsjl                            1/1     Running     0             7d23h
kube-system            pod/calico-node-v7ks2                            1/1     Running     0             7d23h
kube-system            pod/calico-typha-667b5bfff9-m5nrj                1/1     Running     0             7d23h
kube-system            pod/coredns-565d847f94-4bgwp                     1/1     Running     0             8d
kube-system            pod/coredns-565d847f94-qzjfl                     1/1     Running     0             8d
kube-system            pod/etcd-dsnode-1                                1/1     Running     0             8d
kube-system            pod/kube-apiserver-dsnode-1                      1/1     Running     0             8d
kube-system            pod/kube-controller-manager-dsnode-1             1/1     Running     1 (19h ago)   8d
kube-system            pod/kube-proxy-2927p                             1/1     Running     0             8d
kube-system            pod/kube-proxy-vvh89                             1/1     Running     0             8d
kube-system            pod/kube-proxy-w2jjb                             1/1     Running     0             8d
kube-system            pod/kube-scheduler-dsnode-1                      1/1     Running     1 (19h ago)   8d
kubernetes-dashboard   pod/dashboard-metrics-scraper-64bcc67c9c-sh9vk   1/1     Running     0             8d
kubernetes-dashboard   pod/kubernetes-dashboard-66c887f759-7fnbz        1/1     Running     0             8d
local-path-storage     pod/local-path-provisioner-7f68f98c9b-jkfbs      1/1     Running     0             24h
metallb-system         pod/controller-84d6d4db45-9l9qp                  1/1     Running     0             18h
metallb-system         pod/speaker-fnhsw                                1/1     Running     0             18h
metallb-system         pod/speaker-xvv7f                                1/1     Running     0             18h
metallb-system         pod/speaker-zpmj5                                1/1     Running     0             18h
rabbitmq-system        pod/rabbitmq-cluster-operator-594c54dd78-nmgr5   1/1     Running     0             18h
tigera-operator        pod/tigera-operator-6bb5985474-gwr2f             1/1     Running     1 (19h ago)   8d

NAMESPACE              NAME                                         TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)                        AGE
default                service/hello-world                          ClusterIP      10.101.240.144   <none>          5672/TCP,15672/TCP,15692/TCP   18h
default                service/hello-world-nodes                    ClusterIP      None             <none>          4369/TCP,25672/TCP             18h
default                service/kubernetes                           ClusterIP      10.96.0.1        <none>          443/TCP                        8d
default                service/resource-limits                      ClusterIP      10.102.101.17    <none>          15692/TCP,5672/TCP,15672/TCP   24h
default                service/resource-limits-nodes                ClusterIP      None             <none>          4369/TCP,25672/TCP             24h
default                service/server-svc                           ClusterIP      10.96.45.108     <none>          3001/TCP                       24h
default                service/testapp                              LoadBalancer   10.109.66.126    86.50.228.193   80:32077/TCP                   18h
ingress-nginx          service/ingress-nginx-controller             LoadBalancer   10.102.37.179    192.168.1.240   80:32102/TCP,443:30823/TCP     23h
ingress-nginx          service/ingress-nginx-controller-admission   ClusterIP      10.109.5.62      <none>          443/TCP                        23h
kube-system            service/calico-typha                         ClusterIP      10.107.30.96     <none>          5473/TCP                       7d23h
kube-system            service/kube-dns                             ClusterIP      10.96.0.10       <none>          53/UDP,53/TCP,9153/TCP         8d
kubernetes-dashboard   service/dashboard-metrics-scraper            ClusterIP      10.110.57.24     <none>          8000/TCP                       8d
kubernetes-dashboard   service/kubernetes-dashboard                 ClusterIP      10.97.101.119    <none>          443/TCP                        8d
metallb-system         service/webhook-service                      ClusterIP      10.107.220.147   <none>          443/TCP                        18h

NAMESPACE        NAME                         DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
kube-system      daemonset.apps/calico-node   3         3         3       3            3           kubernetes.io/os=linux   7d23h
kube-system      daemonset.apps/kube-proxy    3         3         3       3            3           kubernetes.io/os=linux   8d
metallb-system   daemonset.apps/speaker       3         3         3       3            3           kubernetes.io/os=linux   18h

NAMESPACE              NAME                                        READY   UP-TO-DATE   AVAILABLE   AGE
default                deployment.apps/dep                         1/1     1            1           7d23h
default                deployment.apps/server-dep                  1/1     1            1           24h
default                deployment.apps/testapp                     2/2     2            2           18h
ingress-nginx          deployment.apps/ingress-nginx-controller    1/1     1            1           23h
kube-system            deployment.apps/calico-kube-controllers     1/1     1            1           7d23h
kube-system            deployment.apps/calico-typha                1/1     1            1           7d23h
kube-system            deployment.apps/coredns                     2/2     2            2           8d
kubernetes-dashboard   deployment.apps/dashboard-metrics-scraper   1/1     1            1           8d
kubernetes-dashboard   deployment.apps/kubernetes-dashboard        1/1     1            1           8d
local-path-storage     deployment.apps/local-path-provisioner      1/1     1            1           24h
metallb-system         deployment.apps/controller                  1/1     1            1           18h
rabbitmq-system        deployment.apps/rabbitmq-cluster-operator   1/1     1            1           18h
tigera-operator        deployment.apps/tigera-operator             1/1     1            1           8d

NAMESPACE              NAME                                                   DESIRED   CURRENT   READY   AGE
default                replicaset.apps/dep-79b8464fd9                         1         1         1       7d23h
default                replicaset.apps/server-dep-5c577b6465                  1         1         1       24h
default                replicaset.apps/testapp-5dc5956cdb                     2         2         2       18h
ingress-nginx          replicaset.apps/ingress-nginx-controller-8574b6d7c9    1         1         1       23h
kube-system            replicaset.apps/calico-kube-controllers-798cc86c47     1         1         1       7d23h
kube-system            replicaset.apps/calico-typha-667b5bfff9                1         1         1       7d23h
kube-system            replicaset.apps/coredns-565d847f94                     2         2         2       8d
kubernetes-dashboard   replicaset.apps/dashboard-metrics-scraper-64bcc67c9c   1         1         1       8d
kubernetes-dashboard   replicaset.apps/kubernetes-dashboard-66c887f759        1         1         1       8d
local-path-storage     replicaset.apps/local-path-provisioner-7f68f98c9b      1         1         1       24h
metallb-system         replicaset.apps/controller-84d6d4db45                  1         1         1       18h
rabbitmq-system        replicaset.apps/rabbitmq-cluster-operator-594c54dd78   1         1         1       18h
tigera-operator        replicaset.apps/tigera-operator-6bb5985474             1         1         1       8d

NAMESPACE   NAME                                      READY   AGE
default     statefulset.apps/hello-world-server       0/1     18h
default     statefulset.apps/resource-limits-server   1/1     24h

NAMESPACE       NAME                                       COMPLETIONS   DURATION   AGE
ingress-nginx   job.batch/ingress-nginx-admission-create   1/1           7s         23h
ingress-nginx   job.batch/ingress-nginx-admission-patch    1/1           8s         23h

NAMESPACE   NAME                                           ALLREPLICASREADY   RECONCILESUCCESS   AGE
default     rabbitmqcluster.rabbitmq.com/hello-world       False              Unknown            18h
default     rabbitmqcluster.rabbitmq.com/resource-limits   True               True               24h
```
