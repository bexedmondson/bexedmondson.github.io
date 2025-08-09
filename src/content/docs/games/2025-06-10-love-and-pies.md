---
layout: post
title: Love and Pies
author: "Bex Edmondson"
tags: [game, trailmix, loveandpies]
hero:
  image: 
    file: loveandpies.png
  actions:
   - text: download here
     link: https://lnp-merge.onelink.me/wa3J/lovenpiesfbook
     icon: external
---

&nbsp;

## Game Description

Live the pie life as top baker in Love & Pies! Uncover juicy secrets in every room as Amelia solves mysteries in her family cafe. In a story full of twists and turns, you'll meet dramatic exes, nasty rivals, eccentric relatives, adorable pets and friendly customers. Endless drama, love and secrets - a merge mystery!

## Technical summary

Love and Pies was one of the pioneers in the merge-2 genre, melding a complex story set in a stylised, extensive, and highly customisable map with straightforward gameplay brought to life through vibrant art and animations. Live ops run in parallel, ensuring players have a variety of long-term goals and short term boosts to play for. 

Behind the scenes, Love and Pies is highly data-driven, built with a custom CMS integrated into Unity and its addressable system. All live op behaviour, gameplay behaviour, story content, and much more are defined and serialized through the CMS, with drag-and-drop slots for all assets associated with each feature. This removed dependencies between artists and developers, and allowed content designers to autonomously implement hundreds of game-days' of story content.

> [!info|float-right]
> Prior to launch, this flexibility allowed us to build and test three separate core mechanics simultaneously!

The merge-2 gameplay is powered by the ECS framework Entitas, which allows rapid adjustments and extensions of gameplay mechanics. 

## My contributions

I was part of the Love and Pies team for six years, from early prototyping and playtesting, via a major pivot in the core game, through global launch, and then into live operations. As a result, it's a little tricky to summarise all the work I did on Love and Pies!

My time as part of the Love and Pies team was truly a formative experience. I came out of it a far better and more experienced developer than I started, and that was largely due to the fantastic team I worked with. I learned a lot from the more senior developers on the team, and as each of them moved on to other projects or teams, I inherited responsibility for the code they'd contributed and extended, refactored and built upon it.

By the time I left the team, I was the longest-standing team member by quite a wide margin and the creator or maintainer of many systems, including but not limited to:
- runtime asset loading logic
- automated addressable asset group creation and population
- over-the-air content delivery
- cutscene implementation tooling
- map progression logic, upgrade handling, and optimisation
- analytics systems, as well as the external automated analytics validation system

I also was the go-to developer for handling complex merges or untangling git mistakes, and often helped other devs work out new system structure or solve complex bugs. My tenure on the project meant I had a thorough understanding of the overall game architecture and could reliably anticipate many issues.

The final project I completed as part of the Love and Pies team was a full refactor of the map asset management logic, which was by far the biggest project I independently delivered. The result of my work was a 60% reduction in build time, 95% reduction in frequently-run bake processes, and a major improvement in visible lag and overall performance. 

I'm currently working through my six years at Trailmix and writing up deep-dives into some of the more interesting problems I tackled; you can find more details [here](../tags/loveandpies).
