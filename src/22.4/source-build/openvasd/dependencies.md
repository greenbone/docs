```{eval-rst}
.. tabs::
  .. tab:: Debian

   .. attention::
      For Debian systems you have to follow the `rustup <https://rustup.rs>`_ instructions because the default Rust version is too dated for `OpenVASD`

   .. code-block::
     :caption: Required dependencies for openvasd

     # Follow instructions of https://rustup.rs to install cargo and afterwards run

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

   .. attention::
      For CentOS systems you have to follow the `rustup <https://rustup.rs>`_ instructions because the default Rust version is too dated for `OpenVASD`

   .. code-block::
     :caption: Required dependencies for openvasd

     # Follow instructions of https://rustup.rs to install cargo and afterwards run

     sudo dnf install -y \
       pkg-config \
       openssl-devel
```
