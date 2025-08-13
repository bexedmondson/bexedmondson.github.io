---
title: Making, Breaking, and Uncomplicating Analytic Events
author: "Bex Edmondson"
date: 2025-08-10
draft: false
tags: [ trailmix, love and pies ]
---

This is of how I invented and implemented a system that made analytics bugs in live almost impossible, how I came up with the idea in the first place, and the key things I learned along the way.

### Context

Let me set the stage for the context of this story. When I began working at Trailmix, the game that would become Love and Pies was still over a year from release. As such, the team was small and our playtests even smaller, which meant that our player data gathering at the time consisted of watching over another teammate's shoulder.

<details>
<summary>What are analytic events and why are they important?</summary>
In games, analytic events consist of pieces of data about a player and what they're doing. Analytic events are important in free-to=play games because it's almost impossible to make a game sustainable without knowing (at minimum) where your players are spending money, which players are spending money, and where they're dropping out of the game completely.
</details>

### Setting the stage

A few months after I joined, Trailmix hired their first data team member, who was given the gargantuan task of building out the whole data pipeline from scratch. They began setting up a system where the game build would send data to a Playfab data store, which would then be injested into Google BigQuery for analysis. Due to the obvious capacity constraints on the data team side and a similar lack of time on the dev team side, devs began setting up analytics events for our features in a pretty ad-hoc manner, usually without much forethought, consistency or testing. This is a pretty normal situation for small teams who are working fast, but in turned out that Love and Pies had longevity! So these hacky analytic event implementations made it into production. And then stayed there. For quite a long time. 

And as is often the case with hacky implementations, it was only a matter of time before something went wrong.

### What went wrong

One Monday morning about a year after Love and Pies' global release, a marketing team member came over to the devs in quite a frantic state. They told us that the game hadn't been sending any analytics events about monetisation or attribution for at least three days. This was quite terrifying to hear, because four days ago we had released an update, and during those four days we had been featured by the Google Play store. This meant two things:
1. We were missing crucial data for a huge number of new players.
2. We had broken something in analytics, even though we didn't think we had changed anything to do with it.

We began digging straight away, and before long a teammate discovered that they'd caused the type of bug that is every dev's nightmare: they had refactored a system that they thought was totally unrelated to analytics, and through a series of non-obvious dependencies that routed through some historical hacks, they had actually completely broken the monetisation and attribution analytics system.

They of course immediately began working on a fix, our QA team dropped what they were doing to start testing, and before the end of the day we had submitted a hotfix that solved the issue. But the end result was that we permanently lost the earliest, most important monetisation data for all the new players that came in from the Play store featuring, and we had to delay the next release by more than a week.

### Problem solved?

After we had verified that the fix had worked, we now needed to stop it from happening again. Devs, marketing, data, and production all crowded into a small meeting room and began to figure out how this could've happened to begin with, and what we could do about it in future.

It's at this point I must admit that I had very little to do with the whole scenario up until this point. At the time, I was relatively junior in comparison to everyone else in the meeting, and I think I'd been invited with an expectation that I'd learn something rather than contribute.

Listening to the conversation that ensued was definitely interesting. The developer who had made the breaking change was clearly frustrated with themself and put the blame on entirely on their own shoulders. The QA lead, who at this point was the entirety of the QA department (!), blamed themself for not catching it as well, and said that going forwards, they would just manually check those specific analytics every release.

I was fully aware of how overworked our singular QA tester was, and it seemed to me that adding more to their workload was not only unfair, but also unrealistic! From where I was standing, nobody here was really at fault exactly: it wasn't the dev's fault that they didn't notice the breakage in what should've been a totally unrelated system, and I felt that it was really just chance that it didn't happen to me instead. And I couldn't blame QA either, as they were already so overworked and definitely had enough new things to be testing for each release. But the main thing that stood out to me was how this really didn't solve the underlying problem. Sure, if these specific analytics broke in future, that MIGHT get caught. But there was still only one line of defence there, and it was one that relied on overworked people working even more. And it didn't fix the true problem that analytics could break due to changes that seemed unrelated, and nobody would know unless they specifically went to check. 

I wasn't the only one thinking this way: the head of the data team became increasingly frustrated as no systematic changes were suggested, and the meeting concluded with QA agreeing to the extra workload. I left the meeting knowing that there must be a better solution out there.

### Finding another way

I thought about our analytics system in general as I sat on the tube home that day. Its fragility was not the only problem; I had several grievances with it:
- Our events were sent in JSON format. Every key and every string value were sent as abbreviations in an attempt to minimise the amount of data we were sending. That in itself was a problem, because it was almost impossible to know what each abbreviation meant without digging into the code - not something that a dev should have to do, let alone someone on the data or marketing team!
- Even worse, in order to avoid defining a million strings solely for use in analytics, we had been reusing the same abbreviations to mean different things in different circumstances.
- Due to the ad-hoc and uncentralised implementation of the events, there was almost no consistency between the events. There were some shared fields, but frequently the same value would be sent from two locations formatted in a different way. For example, a cake that had been merged to level 3 was sometimes sent as "cake-3", sometimes "mergePath-cake-3", and sometimes "path: cakes, level: 3".
- And I had a strong suspicion that we'd broken other, less obvious events in the past, and our data team hadn't discovered the breakage yet.

Once I got home, I opened up my laptop and simply googled "json validation". Lo and behold, JSON Schema came up as the first result: a way to describe and define JSON data, using the JSON format! JSON Schema is widely used in several industries, and libraries existed that could be used to validate data against schemas. I dug a bit further, and discovered the Python library jsonschemaforhumans, which could generate a nicely-formatted Markdown document from a JSON schema.

I knew I was on to something good - I could solve the automation, inconsistency, and comprehension problems all at once with the tools I'd found. So I set up an experiment: 
1. First, I put together a quick example schema in a git repository for an existing event.
2. I broke out some of the data that was frequently shared by other events into a subschema and brought it in with an include, to prove that we could reuse parts of schemas for new events which meant that making new schemas would get more efficient over time.
3. I copied out a few examples from our real analytics as test cases.
4. I wrote a script that brought in the test cases and used the event name to pick the right schema. Then it ran the event data through the validator, feeding the result into Pytest to generate a report at the end.
5. Finally, I added a Github action that automatically ran on push to generate Markdown pages, automatically rendered by Github to be a lot more readable than the raw JSON Schema file.

It worked great. After a few tweaks, including bringing in a custom schema template so I could get inter-schema links working, I brought it to my boss. Happily, he saw the potential immediately, and approved me to have some time to start implementing it! 

### Implementation

I began by copying my rough prototype into a new work repository, and set up authentication with Playfab so that I could pull data from storage. I set up my validation script in a job on Teamcity on our build machines, so that I could automatically pull the most recent 24 hours of data. Importantly, I didn't pull data from our live build: I pulled the data from the store that our test builds sent to, so that we could catch issues *before* they went live, while QA was running other tests.

Teamcity has a Pytest integration already, so I hooked that up to the validation report for nicely-readable results. Then I wrote up some draft schemas for all the events and ran the job.

Naturally there were thousands of failures. I was expecting this to a degree, because I knew my draft schemas weren't perfect and I would need to modify them to actually capture the intended structure of each event, but at least I had a starting point!

So I started going through each schema and correcting errors. Unfortunately...as I dug into the code for each event, I discovered some major flaws in the data we were sending. There were even more inconsistencies than I expected; many things that just didn't make any sense; several things that were outright broken and sent nothing, or even worse, that sent data that was completely inaccurate. Fortunately, the fact that it hadn't been flagged meant that the wrong data likely wasn't being used, but then *that* meant we were spending money storing and processing data that we just weren't using!

So suddenly my task had expanded to cover fixing or changing several events, many of which came from code in fundamental systems. But I knew it was necessary in order to have a consistent baseline to begin testing from. Ultimately, I came to the end of the allotted time without solving all of these issues. Everyone I spoke to could see the potential, but there were still many important events that weren't covered by a thorough schema, and there were some major bugs that either I didn't have time to fix, or the QA team didn't have time to test thoroughly enough, or the data team didn't have capacity to send across an exact specification for. I wasn't happy to start running the validation while there were still so many failures because I knew that we'd become accustomed to seeing those failures and not notice when things were actually broken. So I put the whole thing on the backburner for the time being.

However, the story doesn't end there. I continued to push for more time while working on other things, and while the automated testing wasn't running properly yet, the documentation aspect was absolutely present. I booked a meeting with each new data team member that joined to show them how it worked and explain the potential. The data team took on the job of writing schemas for new events as they requested implementation from the dev team, which meant that the documentation stayed up to date. During the wait for more dedicated time, I also had the ability to manually run the validation process, with the results only visible to me. As I had spent so much time digging into each of the events, I could see through the noise and tell when there was something truly wrong, so I flagged up relevant issues when things changed, and sometimes got the opportunity to fix other issues as side effects. Obviously this wasn't sustainable though!

Eventually I did get more time - two years later! I threw myself into ironing out the final issues, and over the next couple of weeks, with the help of some dedicated data team members (if you're reading this, Sonya and Ankit, thank you so much - you were both invaluable!), I got to a point where we had no failures. I set up nightly automation and handed monitoring over to the QA team.

### So did it work?

I think overall, it did! Having understanding of the 

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

# Key take-aways

- solve problems at the source, not at the symptom
- adding work to already-overworked people is never a good solution
- the solution to a problem should not be "well we have to just do the same exact process as before but better"
- automate testing wherever possible
- for things that aren't being intentionally changed, work on an alert-based system where checks happen automatically
- ensure that false failures aren't present when you launch a new testing system or everyone will become accustomed to seeing failures and not pay attention when something does go wrong
- it's always better for the people using documentation to be the ones responsible for its accuracy because they're invested in it being right and they're engaging with it regularly
- if you can see the value in a tool, build a prototype to help people understand what's possible and bring up that you have a solution for something in relevant discussions