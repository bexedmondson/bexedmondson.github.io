---
layout: post
title: "Final year Project"
author: "Bex Edmondson"
categories: game
tags: [game, personalproject]
image: finalyearprojectgradient.png
colorimage: finalyearproject.png
---

#### [WATCH GAMEPLAY VIDEO HERE](https://www.youtube.com/watch?v=t5m0qVqrePU)

#### [AVAILABLE FOR DOWNLOAD HERE](https://drive.google.com/folderview?id=0B5MItPVnQZsEV3ptdHVGX2xwdms&usp=sharing) 

Over the last year of my degree, I built a game as part of my final year project. It's a single-player game based around finding goals in a landscape, using swarm intelligence and simulation. The player pilots a small flock of paper aeroplanes (which are controlled using the [boids algorithm](http://www.red3d.com/cwr/boids/)) towards small goals on the top of hills, with the aim of capturing as many as possoble before the time runs out. 

Like any good game, there's a challenge: distributed across the landscape is a team of insects being controlled by a particle swarm optimisation algorithm. These agents are also trying to capture the goals, and when the time runs out the winning team is the one with the most goals.

## Idea

As you might imagine, I'd been interested in game development for a long time. I'd dabbled in a couple of engines, but mostly due to hardware constraints I'd never got as far as making a "proper" game, so when my final year project came around, I thought this would be the perfect opportunity. 

Also, I'd had an interest in swarm intelligence for a few months: [recent advances in robotics](https://www.youtube.com/watch?v=G1t4M2XnIhI) had brought the concept to my attention, and I knew that there was a third year module about it run by Dr Ed Keedwell. I approached him with a brief outline of my idea, he agreed to be my project supervisor, and my next year of development was set out for me.

## Description

The final game has ended up being something I'm very proud of. It opens into the menu screen, which has the options to start the game, show the tutorial, list the credits or run unit tests.

The game level opens onto a hilly field with small yellow goals on top of the highest hills. There is also a small flock of paper aeroplanes flying in front of the camera, which the player can direct by clicking on the landscape to send the flock to that point.

The total number of goals that have been captured by either team (or that remain un-captured) is shown in the top-left corner. The player captures a goal by moving the flock near a goal, and the enemy team captures one by having two agents near a goal. If both teams have a claim on a goal, it switches back to neutral, and each team has to wait the other out.

## Code Architecture

I planned the code to be set up fairly simply, and it ended up not deviating too much from the initial plan. For each object in the game environment, there is a class and a controller class. These are the boids (the paper aeroplanes in the flock), the agents (the members of the enemy team) and the goals. The controller class is responsible for initialising all the objects and sending information between them: for example, AgentController keeps track of the highest position of any agent in the swarm and gives that information to each agent every frame. Aside from these classes, there's also an InputController to handle mouse click information, and FinalGameMode which initialises the controller classes.

## Boids

Using the boids algorithm was probably the most successful part of the game. Although it took a long time to implement, I'm pretty sure that was because it was the first thing I did - I'd definitely be able to implement it faster now. Playtesters said it was "pretty" and "stunningly beautiful", and I'm definitely going to use boids wherever appropriate in future projects.

## Particle Swarm Optimisation

Unfortunately, not everything went so smoothly. Though I was able to implement PSO fairly quickly, I found that it produced really unnatural movement: in fact, every single playtester identified the agents' movement as a bug, despite it being expected behaviour! In the future, I'm planning on either removing the swarm component entirely, leaving each agent as a hill-climber, or modifying the algorithm to use neighbourhood-based PSO. This latter option might be the best, as the agents have to find more than one hilltop in the landscape, rather than one highest hill, which is what vanilla PSO is best at.

## Future development

I have so many ideas for how to continue this game if I ever get time! The major tasks include modifying PSO as detailed above, adding a countdown timer to the HUD and adding textures to the insect model.

## Finally

I'm really glad to have finally made a complete game from beginning to end. Using swarm intelligence has actually only made me more interested in it, and I have a few non-game-related coding ideas bouncing around in my brain at the moment. First though, I'm going to polish this game so that it can, at my lecturers' request, be used as a project example at my university's open days!