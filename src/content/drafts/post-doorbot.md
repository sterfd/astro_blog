---
title: The RC doorbot app
pubDate: 2024-05-06
description: 'making the lives of rc alum a little bit easier'
author: Stef
tags: ["making things"]
---

Towards the end of my original 12 week batch, all of my friends were about to Never Graduate and lose their keyfobs for the RC hub, meaning they would have to use the dreaded [doorbot website](https://doorbot.recurse.com) to get in. Although the doorbot itself is an amazing piece of engineering that allows anyone with RC credentials to access the hub (alumni, people about to start their batch, anyone who forgot their keys), the user experience of navigating to the page on your phone browser, logging into RC, and doing the whole ritual with the elevators can be a little lacking sometimes. 

- motivations
    - all my friends are alum
    - thought it would take 20 minutes
    - post requests when inspecting the web app doorbot.recurse.com
- server code
    - needs OAuth
    - session information from OAuth token
    - update need new routes with no login session 
    - need to get token owner ID for access list check, doorbotlib commands, logging
- iOS shortcuts
    - shortcut to set up shortcuts
    - sending http requests with headers
    - how to design a seamless experience and prevent spamming of post requests
- mobile app
    - react native first itme user
    - simple idea - 4 buttons to send http requests
    - async storage
    - get token from web browser for set up
    - drop down menu 
    - changing formatting for different screen sizes