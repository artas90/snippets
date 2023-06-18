class Mock():
  def __getattr__(self, name):
    return self
  def __call__(self, *args, **kwds):
    return self
  def __repr__(self):
    return 'mock'
  def __hash__(self):
    return 1
