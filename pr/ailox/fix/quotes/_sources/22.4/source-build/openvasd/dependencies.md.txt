```{note}
For debian and centos systems you have to follow [rustup](https://rustup.rs) instructions because the default Rust version is too dated for `OpenVASD`
```
```{eval-rst}
.. tabs::
  .. tab:: Debian
   .. code-block::
     :caption: Required dependencies for openvasd

     # Follow instuctions of https://rustup.rs

     sudo apt install -y \
       pkg-config \
       libssl-dev 

  .. tab:: Ubuntu
   .. code-block::
     :caption: Required dependencies for openvasd

     sudo apt install -y \
       cargo \
       pkg-config \
       libssl-dev 

  .. tab:: Fedora
   .. code-block::
     :caption: Required dependencies for openvasd

     sudo dnf install -y \
       cargo \
       pkg-config \
       openssl-devel

  .. tab:: CentOS
   .. code-block::
     :caption: Required dependencies for openvasd

     # Follow instuctions of https://rustup.rs

     sudo dnf install -y \
       pkg-config \
       openssl-devel
```
