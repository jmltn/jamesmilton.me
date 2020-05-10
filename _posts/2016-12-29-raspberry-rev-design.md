---
layout: post
title: RaspberryPi RC Car
image: /images/2016/12/raspberry-rev/plate.png
tags:
  - 🎨
  - 💻
author: james
---

![raspberry rev iphone app image]({{ site.baseurl }}/images/2016/12/raspberry-rev/iphoneicon2-min.png#right)

For my A-Level (aged 18) Product Design assignment, I wanted to make a iPhone controlled remote controlled car which could be built with Lego. As a part of this project, I made a logo with Adobe Photoshop for both the branding of the product as well as iPhone icon that went with it.

This project was awarded an A*.

Below are images of the final outcomes and a time-lapse showing the process of making the licence place from start to finish.


</br>

<iframe src='https://www.youtube.com/embed/yhOUE-xUgZ8?autoplay=1&loop=1' frameborder='0' allowfullscreen></iframe>

*The content below briefly shows the process of how the car was developed. If you want to know more about this project, checkout the embedded pdf below of my project submission.*

For my A-Level (aged 18) Product Design assignment, I wanted to make a iPhone controlled remote controlled car which could be built with Lego. Below is a brief overview of how the development of the project, with design and final outcome images as well as code snippets. The full development for this project can be found in the embedded pdf portfolio at the bottom of the page.

---

I designed and 3D printed a chassis for the RC car which holds the Raspberry Pi, motor controller unit, rechargeable battery for Raspberry Pi, and 9v battery for motors. As well as this, on the underside of the chassis is lego surface, which allows you to stick lego accessories onto the underside.

![raspberry rev remote control car with raspberry pi]({{ site.baseurl }}/images/2016/12/raspberry-rev/Lego Holes 2-min.jpg)

![raspberry rev remote control car with raspberry pi]({{ site.baseurl }}/images/2016/12/raspberry-rev/Lego Holes 2-min.png)

![raspberry rev remote control car with raspberry pi]({{ site.baseurl }}/images/2016/12/raspberry-rev/Photo 07-03-2014 18 23 21-min.jpg)

![raspberry rev remote control car with raspberry pi]({{ site.baseurl }}/images/2016/12/raspberry-rev/Photo 16-03-2014 17 00 29 min.jpg)

![raspberry rev remote control car with raspberry pi]({{ site.baseurl }}/images/2016/12/raspberry-rev/Photo 16-03-2014 17 00 51-min.jpg)

![raspberry rev remote control car with raspberry pi]({{ site.baseurl }}/images/2016/12/raspberry-rev/IMG_134-min.JPG)

![raspberry rev remote control car with raspberry pi]({{ site.baseurl }}/images/2016/12/raspberry-rev/IMG_1337-min.JPG)

---

##### The technical setup

1. Raspberry Pi Model B
2. [Dual Bridge L298N Stepper Motor Driver Controller Board Module](http://www.ebay.co.uk/sch/items/?_nkw=l298n&_sacat=&_ex_kw=&_mPrRngCbx=1&_udlo=&_udhi=&_sop=12&_fpos=&_fspt=1&_sadis=&LH_CAds=&clk_rvr_id=1146263434105&rmvSB=true)
    - A pair of inputs that can be controlled by TTL logic levels (like the Raspberry Pi uses).
    - Connections for a 9 Volt battery.
    - A pair of outputs to connect to the DC motors.
3. 2 x 9v motors
	- One motor will control the steering.
	- The other for the forward and backward drive.
	- I used [LEGO 9V Technic Motors](http://www.philohome.com/motors/motorcomp.htm).
4. 9v Battery
	- Connects to the L298N Stepper Motor Driver which then powers the 2 motors in parallel.
5. Rechargeable Power Bank
	- 100-240v input, 5.1v output.
	- Commonly used for recharging mobile phones.

Below is example code which demonstrates control of the motors. The python code is executed from my computer which is connected to the Raspberry Pi over wifi using SSH.

<pre><code>
#These are the keyboard mappings
#q = Go forward
#a = Stop going forward or back
#z = Go back
#i= Go left
#o = Stop steering
#p = Go right

#Get the GPIO module
import RPi.GPIO as GPIO

#Get the time module
import time

#A routine to control a pair of pins
def ControlAPairOfPins(FirstPin,
  FirstState,SecondPin,SecondState):
  print "Controlling them pins"
  if FirstState == "1":
    GPIO.output(int(FirstPin),True)
  else:
    GPIO.output(int(FirstPin),False)

  if SecondState == "1":
    GPIO.output(int(SecondPin),True)
  else:
    GPIO.output(int(SecondPin),False)
  #Just retur
  return

####Main body of code

#Get rid of warnings
GPIO.setwarnings(False)

#Set the GPIO mode
GPIO.setmode(GPIO.BOARD)
#Set the pins to be outputs
GPIO.setup(11,GPIO.OUT)
GPIO.setup(13,GPIO.OUT)
GPIO.setup(19,GPIO.OUT)
GPIO.setup(21,GPIO.OUT)

while True:
  MyChar = raw_input
  	("Press a character:")
  print "You pressed: " + MyChar
  if MyChar == "q":
    ControlAPairOfPins
    	("19","1","21","0")
    print "Forward"
  elif MyChar == "a":
    ControlAPairOfPins
    	("19","0","21","0")
    print "Stop"
  elif MyChar == "z":
    ControlAPairOfPins
    	("19","0","21","1")
    print ("Back")
  elif MyChar == "i":
    ControlAPairOfPins
    	("11","1","13","0")
    print "Left"
  elif MyChar == "o":
    ControlAPairOfPins
    	("11","0","13","0")
    print "Stop steering"
  elif MyChar == "p":
    ControlAPairOfPins
    	("11","0","13","1")
    print "Right"
  else:
    print "Not a command"
</code></pre>

---

##### Online Instruction Manual

[![online lego instruction manual gif]({{ site.baseurl }}/images/2016/12/raspberry-rev/online-instruction-manual-demo.gif)]({{ site.baseurl }}/raspberryrev/){:target="_blank"}

I also created a website which is an online instruction manual on how to assemble the lego parts. It can be found [here]({{site.baseurl}}/raspberryrev/).

---

##### Assignment Portfolio

*Please note that this pdf was converted from a PowerPoint presentation. Because of this, embedded videos which were once on the PowerPoint are not present on this pdf.*

<iframe src="https://drive.google.com/file/d/12PGgeOfXM18eEWkQ1XWbkHWc1_-TlZvA/preview" width="100%" height="700"></iframe>

If you're interested in seeing how I designed the licence plate logo, visit [this post]({{ site.baseurl }}/raspberry-rev-design/).
