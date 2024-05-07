---
title: RC Doorbot Shortcut
pubDate: 2024-05-06
description: 'making the lives of rc alum a little bit easier'
author: Stef
tags: ["making things"]
---

### Links
[iOS shortcut](https://www.icloud.com/shortcuts/85aa5a7033de4608b439614e8ff7fec3) | [Original doorbot](https://doorbot.recurse.com)

## Motivations

Towards the end of my original 12 week batch, all of my friends were about to Never Graduate and lose their keyfobs for the RC hub, meaning they would have to use the dreaded [doorbot website](https://doorbot.recurse.com) to get in. Although the doorbot itself is an [amazing piece of engineering](http://blog.qqrs.us/blog/2018/03/29/doorbot/) that allows anyone with RC credentials to access the hub (alumni, people about to start their batch, anyone who forgot their keys), the user experience of navigating to the page on your phone browser, logging into RC, and doing the whole ritual with the elevators can be a little lacking sometimes. Looking at the doorbot website source code, I thought making iOS shortcuts or a mobile app to send doorbot commands would take 20 minutes - there are just two POST requests that you send to server endpoints, so adding ones personal access token to the authorization header should get you in right...? 


## Server code and OAuth

> `This section describe the doorbot server code fairly vaguely because security :)`

Looking at the doorbot Flask server code, for any of the POST requests to go through to the MQTT broker (sends messages to the robots), the client must have valid session data. This session data comes from the OAuth token, and is checked against an access control list (ACL). If you're not on the ACL, your session data is revoked and you get redirected back to the login page. If the user is authorized, their requests to the MQTT broker are logged with their credentials. 

To make the server code compatible with mobile app access, I needed to create new endpoints that could be accessed without sessions in a secure way. The idea was to make all of the doorbot commands possible with just the personal access/bearer token. I first made a function to pull user information of the token's owner from the RC directory, then check it against the ACL. If all of that happens without error, the profile information necessary for requests to the MQTT broker and logging is returned, otherwise we return a generic 401 - Authorization error. 

I then made 3 new endpoints for mobile users to access - buzz, unlock, and status_check. These all make the call for the token owner's information using the function defined above, and then sends the respective commands off to the MQTT broker. Woohoo! All of the testing was first run on a local server, but once we got the code merged, we could see the robot arms moving on our first try! WHAT A RUSH.


## iOS Shortcuts

I think the first time people look at Apple Shortcuts, it looks like a silly little tool that is vaguely useful in some very specific cases. I came across this [post](https://www.reddit.com/r/shortcuts/comments/vthltc/airdrop_to_windows_pc_links_files_photos_videos/) on reddit, where someone made a shortcut to airdrop files to PC using SSH through your local network. iOS Shortcuts are *insanely* powerful. I recommend you go through the different web and scripting options. It's a great way to make homepage widgets and not have to pay Apple the $100/year development fee to publish apps to the App Store... 

Inspired by the `Airdrop to PC` shortcut, I wanted to create a [setup shortcut](https://www.icloud.com/shortcuts/85aa5a7033de4608b439614e8ff7fec3) - this would guide you to retrieve your personal access token, and set it up for the other doorbot shortcuts, so you wouldn't have to get a new token every time you tried to send the command. With the other shortcuts opened with personal access tokens, they would set those tokens as values in a dictionary, which is sent off as a header in the `Get Contents of URL` - which allows you to make API requests. The response from the server is then displayed as an alert. I received feedback that this alert was annoying, but I figured it served two purposes. One, if the doorbot was down for some reason and the command didn't go through properly, the user would be alerted of this error, and two, it prevents spamming of doorbot commands, which I was very guilty of doing during testing. (Un)Fortunately, once a shortcut is downloaded, it is a local shortcut that can be edited in any way, and the creator is unable to push updates to that shortcut. 

![Shortcut widget!](/assets/doorbot-shortcut.gif)

## React Native Mobile App

I gave a presentation about the iOS widget for doorbot at RC - and at the end, joked about having the Android app on my to-do list, since Android somehow doesn't have a native scripting/automation tool. I didn't think people would care that much about this silly little project, but I received a pretty awesome response, and a few people were enthusiastic about pairing on the Android app. I had some experience with React, but hadn't worked at all with React Native - so this small project with 4 buttons to send HTTP requests to a server seemed like a great opportunity to learn. I'll describe my experience with React Native in the next episode!
