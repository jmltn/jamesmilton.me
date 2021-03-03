---
layout: post
title: Are we ready for a virtual designated driver?
image: /images/2017/03/driverless-cars/Picture3-min.png
tags:
 - Case-Studies
author: james
---

Since 2009, [Google](https://www.google.com/selfdrivingcar/){:target="_blank"} has iterated through four generations of driverless vehicles. Now Google have a real dependable prototype, which has been developed to work on motorways and in complex environments such as city streets, with over 1.5 million self driving miles under their belt [1].

But the question is, do we need them and if so, why aren’t they here yet?

Starting the influx of competition in making the most intelligent and practical driverless cars was down to the Defense Advanced Research Projects Agency (DARPA) in 2004. DARPA is a world renowned funder of cash prizes for the best autonomous cars [2]. It has run multiple [‘Grand Challenges’](https://en.wikipedia.org/wiki/DARPA_Grand_Challenge){:target="_blank"} where competitors ranging from university student teams to motor vehicle engineers challenge their driverless vehicles in a set of long, complex and real-life driving situations.

![driverless cars]({{ site.baseurl }}/images/2017/03/driverless-cars/Picture1-min.png#left)
<small>Image by Bloomberg 2005</small>

Google’s current 2014 prototype has extremely advanced technology built in to appropriately adapt in any given situation. Google’s flagship sensor on the car is a ‘light detection and ranging technology’ (LIDAR). LIDAR creates a 3D image of objects built up from 64 lasers spinning at about 900 rpm. This allows the car to have a 360-degree view of every object in real time. As well as this, the prototype also boasts multiple other sensors; radar, which is used for adaptive cruise control in identifying speeds of nearby vehicles; ultrasound, commonly used for assisted parking by calculating distance of nearby objects; and multiple cameras which are used for identifying the road lanes and signs [3]. Also, Google can take advantage of the immense amount of knowledge stored within their Google Maps platform as a further precaution if any sensors were to fail.

![driverless cars]({{ site.baseurl }}/images/2017/03/driverless-cars/Picture2-min.png#right)
<small>Image by Justin Sullivan/Getty</small>

Increasingly with recent availability of affordable, adaptable and simple hardware, offered by organisations like the [Raspberry Pi Foundation](https://www.raspberrypi.org){:target="_blank"}, there has been a meteoric rise in software enthusiasts taking their own spin on autonomous cars. Without the input of millions of pounds put into research and development, there is a huge open-source community of developers sharing their AI code.

Instead of adapting full sized Toyota Prius’ like Google, these enthusiasts are ripping apart off-the-shelf remote control cars, modifying their circuitry to allow their Raspberry Pi’s to have full control of their movement.

University student, [Zheng Wang](https://zhengludwig.wordpress.com/projects/self-driving-rc-car/){:target="_blank"}, used his Raspberry Pi and other cheap hardware to modify a remote control car [4]. The system is simple, consisting of its inputs – a camera and ultrasonic sensor; a computer - a Raspberry Pi to process the input; and it’s output - a remote control car.

![driverless cars]({{ site.baseurl }}/images/2017/03/driverless-cars/Picture3-min.png#left)
<small>Image by Zheng Wang 2015</small>

A quality in which both Zheng and Google’s driverless cars share is neural networking. As long as the information network from the input sensors is trained, from repetition and trial and error, the processing unit will load the learnt parameters, resulting in very fast prediction, which is crucial for high speed travel [4].

But do we need driverless cars? According to Marc Green and John Senders in their paper [Human Error in Road Accidents](http://www.visualexpert.com/Resources/roadaccidents.html){:target="_blank"} [5], they found that
‘human error was the sole cause in 57% of all accidents and was a contributing factor in over 90%. In contrast, only 2.4% were due solely to mechanical fault and 4.7% were caused only by environmental factor’.
Unlike humans, driverless cars will never drink and drive nor be able to lose concentration and get frustrated from road rage. Unquestionably, driverless cars will lower the 1.3 million deaths in road crashes each year world wide [6].

However, the topic of ethics and driverless cars are issues that companies like Google and others are having to contend with. More specifically, the much-debated ‘Trolley Problem’.

In simplistic terms, the Trolley Problem consist of a trolley plunging down a track. Further down the track, there is a gathering of five people who are about to be killed by this trolley. An observer can however throw a switch and divert the trolley onto a different track where only one person is standing, who is out of harms way, but will be hit by the trolley, depending on the observer’s actions [7].

![driverless cars]({{ site.baseurl }}/images/2017/03/driverless-cars/Picture4-min.png#right)
<small>Image by Frank O’Connell 2010</small>

This is a problem which philosophers have been perplexed by for years. There is no right answer – if us humans don’t know the correct answer, how are we expecting driverless cars, when put in a similar situation, to play the ‘role of God’ and know the right thing to do?

For example, the driverless car is driving down the motorway, and a fully occupied family car suddenly pulls into the driverless car’s lane and a fatal crash with the car is inevitable. The driverless car’s processor perceives this situation and looks to swerve out the way. However, the only possible place to swerve is onto the path where one person is walking, out of harms way. The decision the car makes is entirely dependable on how it was programmed.

The computer programmers have to decide on how to program the vehicle to deal with situations involving fatalities, which is far beyond any normal software engineer’s job description. When UK laws are amended, which will be in 2017 with the EU following suit in 2018, it will be decided who would be liable if a driverless car injures or kills somebody [8].

Due to the stigma attached to the failings of software in the past, it’s unlikely that this generation of drivers will trust driverless cars enough to take them home. With this PC world we live in, it is not possible to produce an ethical algorithm which can deal with every situation that even humans can’t deal with. True, driverless cars are still a future prospect, however until then, driver aids such as automatic emergency braking and assisted steering is the landmark we are currently at.

---

[1] Google, "Google self-driving car project," Google Self-Driving Car Project. [Online]. Available: https://www.google.com/selfdrivingcar/. Accessed: Apr. 18, 2016.

[2] "Creating Breakthrough Technologies for national security," 2016. [Online]. Available: http://www.darpa.mil. Accessed: Apr. 18, 2016.

[3] "10 astonishing technologies that power Google’s self driving cars," National Tyres and Autocare. [Online]. Available: http://www.national.co.uk/tech-powers-google-car/. Accessed: Apr. 18, 2016.

[4] Z. Wang, "Self driving RC car," Zheng Wang, 2015. [Online]. Available: https://zhengludwig.wordpress.com/projects/self-driving-rc-car/. Accessed: Apr. 18, 2016.

[5] M. Green and J. Senders, "Visual expert human factors: Human error in road accidents," 2013. [Online]. Available: http://www.visualexpert.com/Resources/roadaccidents.html. Accessed: Apr. 18, 2016.

[6] "Road crash statistics," in Association for Safe International Road Travel. [Online]. Available: http://asirt.org/initiatives/informing-road-users/road-safety-facts/road-crash-statistics. Accessed: Apr. 18, 2016.

[7] J. J. Thomson, "The trolley problem," The Yale Law Journal, vol. 94, no. 6, p. 1395, May 1985.

[8] Department for Transport, "The Pathway to Driverless Cars: Summary report and action plan," 2015. [Online]. Available: https://www.gov.uk/government/uploads
/system/uploads/attachment_data/file/401562/pathway-driverless-cars-summary.pdf. Accessed: Apr. 18, 2016.
