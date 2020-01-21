# -*- coding: utf-8 -*-

import sys
import Adafruit_SSD1306
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

# Settings
FONT_SIZE = 12
LINE_SPACING = 4

args = sys.argv
linenum = int(args[1])  # 0 origin
if linenum >= 0:
    text = args[2]

RST = 24

disp = Adafruit_SSD1306.SSD1306_128_64(rst=RST)

disp.begin()

if linenum < 0:
    disp.clear()
    disp.display()
    exit()

width = disp.width
height = disp.height
image = Image.new('1', (width, height))
draw = ImageDraw.Draw(image)

#draw.rectangle((0, 0, width, height), outline=0, fill=0)

font = ImageFont.truetype(
    '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf', 12)

LINE_HEIGHT = FONT_SIZE + LINE_SPACING

x = 0
y = linenum * LINE_HEIGHT
draw.rectangle((x, y, width, y+LINE_HEIGHT), outline=0, fill=0)  # 行消去
draw.text((0, y), text, font=font, fill=255)

disp.image(image)
disp.display()
