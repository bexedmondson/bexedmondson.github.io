---
layout: post
title: "Tube Meeting Point Finder"
author: "Bex Edmondson"
tags: [ project, personalProject ]
hero:
  image: 
    file: "./tubemeetingpoint.png"
  actions:
   - text: try it out
     link: https://bexedmondson.com/meetingpoint
     icon: right-arrow
   - text: view the source
     link: https://github.com/bexedmondson/meetingpoint
     icon: external
     variant: secondary
  banner:
     content: test banner :)
---

&nbsp;

## What is this?

At time of writing, this tool takes in a set of starting tube stations (i.e. you and your friends' closest stations) and a set of possible stations to meet at, and calculates which end station has the lowest average travel time from each starting station. See [below](#still-to-come) for future planned functionality!

## Why I made this

I began putting this together after my partner spent three days going back and forth with a group of friends, trying to figure out where to meet up. I'm a problem solver at heart, so though I knew this wouldn't be something I could get done in time to help this particular scenario, maybe it would be useful in future!

## The easy part

London's transport network can be easily abstracted down to a graph, and having some knowledge of graph theory I knew that I would be able to find a theoretically optimal meeting point using Dijkstra's algorithm.

I found a dataset that had tube stations, connections between stations, and the time each connection takes. It was (and is) a bit out of date without even the Elizabeth line, but that's a solvable problem and one I could tackle later.

## The hard part

I also knew that if this was going to have the slightest chance of being useful, having it on a website was a requirement. Unfortunately I have never considered myself a web dev! 

However, I was undeterred. After spending a long time - too long - reading about JS frameworks and libraries and trying my best to figure out which one would work, I went with React. And after about a week of trying to make it work, I figured out that was actually the wrong choice, and switched to Svelte instead!

I found a library that had an implementation of Dijkstra's algorithm, and began implementing. Unfortunately the library didn't quite return the information I actually needed - it would return the shortest path from one point to another, but without the cost of that shortest path. And without that, I couldn't find the best solution for all possible starting points. So I forked the library and used my own version instead!

I ran into some issues with replacing a library with my own implementation, admittedly due to my own inexperience with javascript. As a result, I put this on the backburner for a while, but this project was always something I wanted to go back and fix - and I've finally found time to do just that.

## Still to come

My to-do list with this project, as of October 2025:
- [x]  Filling out the dataset with the Elizabeth line and Northern Line extension, and checking that nothing else is missing
- [x]  Refactoring the algorithm more than I already have, to make the calculation a lot more optimal
- [ ]  Adding a mode where you can find the optimal station to meet without having to provide a list of possible end stations
- [x]  Showing the route each person would need to take
- [ ]  Adding line changeover time into the calculations
- [ ]  Showing alternative meeting points and associated routes
- [ ]  And more...