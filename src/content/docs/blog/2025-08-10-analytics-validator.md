---
title: Making Analytics Actually Useful
draft: true
author: "Bex Edmondson"
date: 2025-08-10
tags: [ trailmix, love and pies ]
---

# Intro

- analytics are important to be able to know where your players are spending money, which players are spending money, and where they're dropping out of the game. with this info you can make informed changes to help keep your game sustainable

# Context

- qa team was one person
- refactor by member of 4 person dev team had broken monetisation-related analytics
- had not caught it in testing as it was assumed to be completely unrelated to the area that was being refactored
- end result was that the monetisation analytics were broken on live for four days over the weekend, and only got flagged up by the marketing team when they got back on monday and realised that there had been no data coming through for days
- all hands on deck for figuring out how on earth it had broken and then testing, building and releasing a hotfix
- delayed next release by over a week

# My thought process

- sat in the post-incident discussion as a third party
- the only solution that was being discussed as reasonable was just to test everything all the time always forever
- watched the head of data get more and more frustrated
- i also knew that the format that it was written in was random json structures being chucked in by devs wherever we'd thought it would be useful, which meant no consistency as well as all the older stuff was probably broken a bit
- data infrastructure had been very bare bones for a long time in an attempt to keep things low cost, but result of that was that devs just sort of put random events in where we thought it would be useful, events were each built separately, and there was little to no testing of the event implementation
- and for space-saving reasons all the fields were cryptic abbreviations being reused as different meanings in different events

# Solution

- analytics were sent to a data store on playfab
- sent in json format
- went home and googled 'json validation' and lo and behold, json schema exists, and validators were already a widely-used thing implemented in multiple languages
- also discovered that there was a python library, jsonschemaforhumans, that could translate a json schema into nicely formatted markdown
- saw the potential to kill two birds with one stone, automation and comprehension
- decided to run an experiment: in my own time i put together a quick example schema for an existing event and copied out a few examples from our real analytics
- added a github action that automatically ran on push to generate markdown that was sufficiently readable
- broke out some of the data that was frequently shared by other events into a subschema and brought it in with an include, to start things off as reusable

- after some tweaks including copying in a custom schema template so i could tweak some of the links, presented it to my boss
- he was very enthusiastic and approved me to have some time to implement it

- hooked it up to build machines on a teamcity job that pulled the most recent 24 hours of data (though this was configurable for ) from the playfab data store that our test build sent to, so that we oculd catch issues BEFORE they went live
- used teamcity's pytest integration to run a python json schema validator against each event using the appropriate schema and output the appropriate result
- thousands of failures, of course, so i started digging into each. many issues were down to 
- unfortunately...as i dug into each of our analytics to build a schema for each of our events, i discovered some major flaws in the data we were sending
- inconsistencies, nonsensicalities, events that were outright not sending or worse, sending with completely incorrect data
- fortunately, the fact that it hadn't been flagged meant that the wrong data wasn't being used, but then THAT meant we were spending money storing and processing data that we just weren't using
- so suddenly task expanded to cover fixing or changing several events in order to have a consistent baseline to test from

- ultimately came to the end of the allotted time - everyone could see the potential but there were still many important events that weren't covered and some major bugs that i didn't have the time to fix nor the assistance from the data team that i'd need to rework the event to be more useful
- however, continued to push for more time while working on other things
- automation was not present but the documentation aspect was absolutely present - booked a meeting with each new data team member that joined to show them how it worked and explain the potential
- data team took on the job of writing schemas for new events as they requested implementation for them, which meant that the documentation stayed up to date
- during the wait for more dedicated time, i did have the ability to manually run the validation process but only visible to me
- and as i had spent so much time digging into each of the events, i could tell when there was something wrong, so i flagged up relevant issues when things changed, and sometimes got the opportunity to fix other issues as side effects
- obviously this wasn't sustainable though

- eventually did get more time - two years later!
- threw myself into ironing out the final issues
- set up nightly automation and handed monitoring over to qa fulltime

# Evolution of solution over time

- added abiity to run validation against events that came from builds on specific branches
- filtered daily testing to just main and release branch builds
- set up slack notifications to notify qa dept of test status
- had meeting with qa to emphasise the importance of not letting errors go and letting ourselves become accustomed to failures (edit this to sound like it's something qa and i came up with together though)

- what could we have done that we didn't do?
  - publish the readable generated version to something readable to allow CS agents to read players' events and understand the context of the players' requests
  - make the schemas more thorough - validate values more with regexes or specified values, or combinations of values in different fields
  - periodic validation against live events
  - figure out a better way to validate whether an event was missing completely
  - implement a testing plan that tested all events
  - probably a lot more things!

# Conclusion

- solve problems at the source, not at the symptom
- adding work to already-overworked people is never a good solution
- the solution to a problem should not be "well we have to just do the same exact process as before but better"
- automate testing wherever possible
- for things that aren't being intentionally changed, work on an alert-based system where checks happen automatically
- ensure that false failures aren't present when you launch a new testing system or everyone will become accustomed to seeing failures and not pay attention when something does go wrong
- it's always better for the people using documentation to be the ones responsible for its accuracy because they're invested in it being right and they're engaging with it regularly
- if you can see the value in a tool, build a prototype to help people understand what's possible and bring up that you have a solution for something in relevant discussions