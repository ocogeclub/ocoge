#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import cv2
import time

# 引数
args = sys.argv
isWIN = 0
if len(args) >= 2:
    if args[1] == "-w":
        isWIN = 1

# カメラの準備
faceCascade = cv2.CascadeClassifier('scripts/haarcascade_frontalface_alt.xml')

capture = cv2.VideoCapture(0)  # カメラセット
# 画像サイズの指定
ret = capture.set(3, 320)
ret = capture.set(4, 180)

try:
    while True:
        ret, image = capture.read()  # 画像取得
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        face = faceCascade.detectMultiScale(
            gray_image, scaleFactor=1.3, minNeighbors=2, minSize=(30, 30))

        if len(face) > 0:  # 一番大きい顔を選ぶ
            bigw = 0
            for (x, y, w, h) in face:
                if w > bigw:
                    bigx = x
                    bigw = w

                if isWIN:
                    cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

            pos = (bigx+(bigw/2)) - 160  # 顔の位置

            print pos
            sys.stdout.flush()

        if isWIN:  # カメラ画像表示
            cv2.imshow("Camera Test", image)
            # キーが押されたら保存・終了
            if cv2.waitKey(10) == 32:  # 32:[Space]
                pass

except KeyboardInterrupt:
    capture.release()
    cv2.destroyAllWindows()
    print "正常終了"
