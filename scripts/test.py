#!/usr/bin/env python
# -*- coding: utf-8 -*-

import time
import sys

for i in range(10,0,-1):
    # print (i, flush=True) # flush=True を指定することで、バッファが無効になる
    print i
    sys.stdout.flush() # python2.x
    time.sleep(1)
# print ('終了 - Python test')
print '終了 - Python test'

