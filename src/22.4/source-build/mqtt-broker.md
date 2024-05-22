### Setting up the Mosquitto MQTT Broker

The Mosquitto MQTT broker is used for communication between
*ospd-openvas* and *openvas-scanner*.

```{note}
In the future, planned changes to `ospd-openvas` will remove dependence on the Mosquitto MQTT broker, but for now it is still a requirement.
```

```{eval-rst}
.. tabs::
  .. tab:: Debian/Ubuntu
   .. code-block::
     :caption: Installing the Mosquitto broker

     sudo apt install -y mosquitto

  .. tab:: Fedora/CentOS
   .. code-block::
     :caption: Installing the Mosquitto broker

     sudo dnf install -y mosquitto
```

After installing the Mosquitto broker package, the broker must be started
and the server uri must be added to the *openvas-scanner* configuration.

```{code-block}
:caption: Starting the broker and adding the server uri to the openvas-scanner configuration

sudo systemctl start mosquitto.service
sudo systemctl enable mosquitto.service
echo -e "mqtt_server_uri = localhost:1883\ntable_driven_lsc = yes" | sudo tee -a /etc/openvas/openvas.conf
```
