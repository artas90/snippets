from functools import wraps
import threading


def singleton(cls):

    class SingletonCls(cls):
        __module__ = cls.__module__
        __name__ = cls.__name__
        __doc__ = cls.__doc__
        __dict__ = cls.__dict__

        __singleton_lock = threading.Lock()
        __singleton_instance = None

        @classmethod
        def get_instance(cls):
            with cls.__singleton_lock:
                if not cls.__singleton_instance:
                    cls.__singleton_instance = cls()
            return cls.__singleton_instance

    return SingletonCls

# ---- ----

class A_Base(object):
    def render(self):
        print 'A'

@singleton
class A(A_Base):
    pass

# ----  ----


class B_Base(A_Base):
    def render(self):
        print 'B!'

@singleton
class B(B_Base):
   pass

# ---- ----

a = A.get_instance()
print("a: %s" % a)
a.render()

b = B.get_instance()
print("b: %s" % b)
b.render()

# -----

# a: <__main__.A object at 0x10e532850>
# A!
# b: <__main__.B object at 0x10e532c90>
# B!
