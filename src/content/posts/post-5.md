---
title: Scanning Website Directories with dirb
author: Stef
description: using dirb and then writing my own python script for these brute force attacks
pubDate: 2024-03-04
tags: ["breaking things"]
---
During one of the early CTF meetings, going through an easy Hacker101 challenge, we realized trying certain common URL routes would lead to new pages - how exciting - we felt like h@ckers! It's a little unrealistic to just guess these one by one, so I found a new toy: [dirb](https://www.kali.org/tools/dirb).

dirb is a tool used to fuzz website directories. You supply it a list of routes in a .txt and it'll slowly crawl through all of them and return a list of routes that exist with their response code! I used a pretty small list from [SecLists](https://github.com/danielmiessler/SecLists/blob/02493db963c18bcf4fcb96a463ff4cc3268cf2b6/Discovery/Web-Content/common.txt) of ~4600 routes but this still takes about 15 minutes to run (without recursion). 

> <code>dirb https://breakintothiswebsite.com /path/to/wordlist.txt</code>

If you don't want dirb to recursively go through all subdirectories it finds, add the <code>-r</code> flag.

