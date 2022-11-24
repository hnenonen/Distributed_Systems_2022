# Initialization of Kubernetes and Instances

The application runs on CSC cPouta virtual machines and utilizes Kubernetes.
To initialize any instance, first run the script:

```
scripts/init.sh
```

If you are initializing a master node, run

```
scripts/initmaster.sh
```
after you have run the first (`init.sh`) script.

Please note, that you have to grab the token from the output of `initmaster.sh` script.
