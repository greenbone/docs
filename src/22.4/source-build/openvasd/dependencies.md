```{eval-rst}
.. tabs::
  .. tab:: Debian

   .. attention::
      For Debian systems you have to follow the `rustup <https://rustup.rs>`_ instructions because the default Rust version is too dated for `OpenVASD`

   .. code-block::
     :caption: Required dependencies for openvasd

     # Follow instructions of https://rustup.rs to install rustup and afterwards run

     sudo apt install -y \
       pkg-config \
       libssl-dev

     rustup update stable

  .. tab:: Ubuntu
   .. code-block::
     :caption: Required dependencies for openvasd

     sudo apt install -y \
       rustup \
       pkg-config \
       libssl-dev

     rustup update stable

  .. tab:: Fedora
   .. code-block::
     :caption: Required dependencies for openvasd

     sudo dnf install -y \
       rustup \
       pkg-config \
       openssl-devel

     rustup update stable

  .. tab:: CentOS

   .. attention::
      For CentOS systems you have to follow the `rustup <https://rustup.rs>`_ instructions because the default Rust version is too dated for `OpenVASD`

   .. code-block::
     :caption: Required dependencies for openvasd

     # Follow instructions of https://rustup.rs to install rustup and afterwards run

     sudo dnf install -y \
       pkg-config \
       openssl-devel

     rustup update stable
```
