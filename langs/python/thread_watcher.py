import threading
import pytest
from datetime import datetime

class ThreadWatcher(threading.Thread):
    CHECK_INTERVAL = 1
    def __init__(self):
        threading.Thread.__init__(self)
        self._timer = threading.Event()
    def run(self):
        while True:
            self._timer.wait(self.CHECK_INTERVAL)
            now = datetime.now()
            t_list = threading.enumerate()
            t_list = [
                '%s--%s--daemon:%s' % (it.__class__.__name__, it.name, it.daemon)
                for it in t_list
            ]
            with open('/Users/andrey/__tt.txt', 'a') as f:
                print >> f, '\n', now, '  >  ', t_list
w = ThreadWatcher()
w.setDaemon(True)
w.start()

pytest.main('test/test_lib -v --junitxml=unit_testreport.xml --cov lib')
