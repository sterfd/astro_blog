---
title: A distributed video streaming platform
author: Stef
description: backend microservices application for video streaming
pubDate: 2024-03-13
image: "/assets/youflix.png"
tags: ["node", "azure", "kubernetes", "terraform", "docker"]
---

[YouFlix](https://github.com/sterfd/microserviceProj)

At RC, a bunch of us wanted to learn about distributed backend systems, so we went through the book, Bootstrapping Microservices by Angela David, and built a video streaming platform on the cloud, handled by a bunch of microservices! I learned about and used a whole bunch of technologies, and it all came together beautifully :D
- docker - containers to run microservices in a controlled environment
- kubernetes - clusters on the cloud to deploy containers in a production environment
- azure - the cloud provider used for kubernetes cluster services and container registries
- terraform - creation of all the infrastructure with terraform code
- mongoDB - database for metadata storage
- rabbitMQ - messaging queue for indirect communication between microservices
- node.js - servers, API endpoints
- github actions - ci/cd pipeline 
- jest, playwright - automated testing, from individual unit test to end-to-end testing
