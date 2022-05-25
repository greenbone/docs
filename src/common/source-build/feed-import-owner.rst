Setting the Feed Import Owner
-----------------------------

Certain resources that were previously part of the gvmd source code are now
shipped via the feed. An example is the scan configuration "Full and Fast".

Currently every resource needs an owner to apply the permissions and manage 
the access to the resources.

Therefore, *gvmd* will only create these resources if a *Feed Import Owner* is
configured. Here the previously created admin user will be used as the
*Feed Import Owner*.

.. code-block::
  :caption: Setting the Feed Import Owner

  gvmd --modify-setting 78eceaec-3385-11ea-b237-28d24461215b --value `gvmd --get-users --verbose | grep admin | awk '{print $2}'`
