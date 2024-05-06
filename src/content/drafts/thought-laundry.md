---
title: Laundry project notes
pubDate: 2024-03-14
author: Stef
tags: ["making things"]
---
## Motivations
In this project, I aim to have my model be able to classify laundry tag icons, so I can take images of laundry tags and be given easily readable instructions for how to wash my clothes. 
I managed quite a bit of progress on this before RC, I had a model that was identifying all the icons on the page with pretty high accuracy, but classification was a problem! I was using a pretrained YOLOv8 model to train classification of the laundry icons. It seems to be comprised of ~20 blocks/layers.
I *really* wish I blogged or documented my progress, because there are so many folders, copies of notebooks, links to references where I learned everything are missing, and half of my dataset might be on my desktop back in Toronto. I've gone through Karpathy's video lectures and I survived the ARENA curriculum, so I should be able to figure all of this out for myself, right?

## Overview
Since there's no publicly available datasets for laundry tag icons, I went to the mall and got to work.... To train the model, I want to prepare a dataset of just the icons, without the tags or my hand in the photo, and all of that context. This will require some massaging - I should train a model to place bounding boxes on the tags, then crop the images. Tags usually have around 5 icons, so I'll need more bounding boxes and cropping. Then comes the fun of labelling the images. There are around 100 different laundry care icons, and a few of them are pretty rare... I thought the first model I'd try to train would be ResNet34 that we built in ARENA.   

## Preparation of the Dataset
- bounding box and crop to tag
- bounding box of icons and crop
- labelling icons
- icon transformations and augmentation

### File management
- /img_test.py - display an image with CV2 with bounding boxes from .xml
#### /dataset
- There are original /images (111 images, about 2-3 MB each)
- Also /aug_images (~50 kB) which are resized down
- I seemed to have also defined BB coordinates for tags (46) for some images in corresponding, individual .xml files in /annotations/tags... don't remember what program I used for that. also have BBs for icons (36) in .xml files in /annotions/icons
- dataset.ipynb - all the image/bb augmentation and file processing functions here
    - load all images as np arrays and put in array
    - compiles all individual .xml files to a .csv
    - resizes images and associated BBs, maintaining aspect ratio/rotation using imgaug, saves them all 
    - displays the resized images/BBs
- [x] *find out the standard for dataset images/coords/labels in peoples workflows*
- [ ] *find out how the heck i got these BBs*

#### /icon-bb
- tried a couple models - pretrained VGG16, weights from imagenet, train with 3 hidden relu layers and sigmoid output 
- yolo - predict.ipynb - needs all labels to be in txt files (xml_to_txt.py) ? folder of images and labels 
    - training - 200 epochs on 36 images (train.ipynb), 1 class = icon lol
    - prediction - I remember this was pretty good, unless the tag has a bunch of korean letters
        - go through all images in dataset, prediction on BB coord and save image from those coords to new files
- [ ] *find out what is a model that predicts BB coords? what type of regression - conv -> sigmoid? since coords are 0-1*

#### /icon-class
- /image and /label where train and predict are working on
- csv_to_txt.py - convert icon_labels.csv to individual .txt files with "label_int, 0.5 0.5 1.0 1.0"
    - yolo model for classification - .txt labels for each image file - icon class, followed by 4 numbers (0.5 0.5 1.0 1.0).... what are these
- icon_labels.csv - image filenames and classification
- config.yaml - with different label classfiications
- /icon_export - different subset of icon images than /images
- /runs and /test_predictions
- train1.ipynb - 10 epochs of training, batches of 16 - not sure if taken pretrained model from BB
- [ ] *what should the output/labels look like? what are the 5 numbers*
<!-- 
### BB tags
- dataset.ipynb - 


### BB icons  -->


<!-- ### Labelling icons T_T -->

## TO DO
- make model for BB icon prediction 
    - [x] find how i got the BBs in the first place...
    - [x] define a std size for the icon output in the future - keep square shape
    - [x] find a way to keep track of the image files, which ones have been labelled manually, predictions made, icon file names as a result
    - [x] process the annotation coordinates and ...
    - [ ] prepare dataset - do some scaling on training data
    - [ ] find the model architecture
    - [ ] train the model
    - [ ] have some way to evaluate the models performance



### Transformation and Augmentation
- do it all - rotations, stretches, color inversion, masks - wait on the orig or icons
- probably keep all the channels in images
- what size should the icons be?

## Training the Model
- find out from isaac or regis! 

