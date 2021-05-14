import time
from threading import Thread

class ExpireThread(Thread):
  def __init__(self, container, ttls, key, ttl):
    Thread.__init__(self)
    self.setDaemon(True)
    self._container = container
    self._key = key
    self._expiration = ttls
    self._ttl = ttl

  def run(self):
    time.sleep(self._ttl)   # <-- it freezes all tests, why need this sleep 
    #print("woke up, deleting key %s from container %s" % (self._key, self._container))
