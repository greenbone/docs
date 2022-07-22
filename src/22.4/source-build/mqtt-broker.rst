Setting up the Mosquitto MQTT Broker
------------------------------------

The Mosquitto MQTT broker is used for communication between 
*ospd-openvas*, *openvas-scanner* and *notus-scanner*.

.. code-block::
  :caption: Installing the Mosquitto broker

  sudo apt install mosquitto

After installing the Mosquitto broker package, the broker must be started 
and the server uri must be added to the *openvas-scanner* configuration.

.. code-block::
  :caption: Starting the broker and adding the server uri to the openvas-scanner configuration

  sudo systemctl start mosquitto.service
  sudo systemctl enable mosquitto.service
  echo "mqtt_server_uri = localhost:1883" >> /etc/openvas/openvas.conf
