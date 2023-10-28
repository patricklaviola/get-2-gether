October 26, 2023

Today was bitter sweet, it was all such a smooth project with how well we all worked together so its sad that its over. We redeployed in the morning and had a little issue with the redeployment but it was because we did not reset the front-api when we deleted our frontend DB. I am working on the final journal so that I can merge my last branch before grading. Also finished final styling, however the default image would only render on the localhost and not on our deployed website so that was a bummer. But overall super proud of this team and honored to be apart of it.

***My biggest aha moment, was when useEffect clicked for me. I never really understood how it knew when to update the page so it was huge when Jordan was explaining it and it finally clicked that any change to the dependency will fire useEffect. 

TMonday I plan to pass the final assesment, I am hoping to study like crazy and then fingers crossed become a Galvanize Alumn. 


October 26, 2023

Today I added styling to the rest of the webpage, and then ensured that all the chat features worked to how we wanted it to. We all helped test all the code and ran through the website multiple times on each of our computer to ensure it will work for presentations tomorrow. We refactored the menu to its own component so that there will be less lines of code in the groups/personal dashboard. I removed any final comments or console.logs from VS code and then we worked on styling again.

Tomorrow we plan to re-deploy first thing in the morning and check for errors!!!


October 25, 2023

Today we are going to hopefully get to redeploy, create any final endpoints, add user_name to be returned to messages so we can use on the front end. We need to turn the add group/group member pages into modals for the webpage. I will need to work on correcting the formatted date in the messages box, and test everything renders correctly. Then we added unique constraints to the group members and event tables.

Tomorrow we plan to re-deploy to ensure we are good with all our endpoints, fix any final issues with navbar, redirection of pages, and chat feature.


October 24, 2023

Today we are keeping our heads down and trying to push to make sure the project is where it needs to be in time for presenting. We are going to be finishing up with the tasks from yesterday and then we are going to test all the new endpoints and ensure they still pass the pipeline. 

Tomorrow we plan on creating additional endpoints, any new/necessary endpoints that maybe needed. create a new group modal, and then the modals for the event details and creating event were debugged


October 23, 2023

Today we plan to add styling to group dashboard, as well as some other values. Patrick is going to start working on the personal dashboard, and then I am going to sign-up styling. We need to add another endpoint for get all groups by user. This endpoint is for Patrick's personal dashboard so that 

Tomorrow we plan on we plan on updating group memeber  and event attendees tables to use a unique so that a user cannot make multiple accounts. Then we need to correct get messages to show the user name, I am going to be working on the event attenddee to be by using the groupsmember list. So I had to update the backend.


October 19, 2023

Today we plan to look into api-unit-tests-job as it is failing and we need it to pass in order to deploy frontend. And then we plan on just working on all the components we agreed to do. I was working on createevent and viewdetails forms in order to stay busy and it was really fun, that was my first time creating a modal and it was super fun!

Tomorrow we plan on going back to revisit if we need to update our sql tables as I believe we may need additional information to be returned. Then we also plan to work on group-dashboard


October 18, 2023

Today we are picking up speed!!! We still struggling with a kubernates issue when trying to work on CI/CD, but its because we were flagged and locked us out. So Galvanize is looking into getting us unlocked. We finished login, logout, and sign-up pages. I worked specifically on the sign-up file

Tomorrow we plan to deploy our front end, finish unit tests, continue working on frontend pages, and then add frontend auth


October 17, 2023

Today we are going to start working on CI/CD, hopefully work on front end auth, unit tests, and start working on the front end. I am nervous about the CI/CD only because its super important. But with mob programming I know we got this as we are all super detail oriented. Also I am really hoping to start with some front end work, as a software developer I think my favorite things to work on is front end, its just so cool and the colors and themes, its just awesome.

Tomorrow we plan to debug CI/CD, we just want to double check it. Start unit tests and start frontend work.


October 16, 2023

So today we finished ALL the backend endpoints!!! Its so cool that all our code is working so smoothly together, I feel like we are all working at the same pace, are not afraid to ask for help if needed and we are all available to assist if needed. It truly is awesome to be apart of this team

Tomorrow we plan to review endpoints, complete merge request documentation, updated journals, work on CI/CD, and then hopefully work on some frontend!!!


October 12, 2023

Today we completed adding authorization to the groups related endpoints and created issues and files for the remaining endpoints. I am going to be working on the chat endpoints so I am super excited about that as I just am stoked we are starting to code more and everything is coming together.

Tomorrow we plan to continue working on final endpoints, complete documentation for merge requests, and then work on our journals.


October 12, 2023

Today we finalized API documentation again. Fixed groups and auth endpoints to reflect table changes and we created issues for remaining endpoints so that we can tackle them individually but as a team if needed.

Tomorrow we plan to create issues for final endpoints.


October 11, 2023

Today we finalized API documentation fixed groups and auth endpoints to reflect table changes and we created issues for remaining endpoints so that we can tackle them individually but as a team if needed.

Tomorrow we plan to start working on the endpoints created issues and if there are additional endpoints create an issue so that we can start working on them.


October 10, 2023

Today we updated our API documentation, changed some of our table schemas, and got our gitlab permissions corrected!! Pretty productive and things are really moving along and our team works great like a well oiled machine. I feel like right now we are not doing a ton of coding or progress but the communication and us listening to ourselves is super valuable and is going to save us time in the future since we are tackling these things now instead of ignoring them.

Tomorrow we plan to fix groups endpoints to reflect the table changes and then add authorization to any groups related endpoints.


October 9, 2023

Today we went through the code we had written since we had a nice long break and to refresh the code in our minds. Next we circled back to the discussion if we want to change accounts to users for consistency or if we were okay with proceeding as is. We also plan on merging our first issue today for our groups endpoints as they are all working and doing what they were built for. We did have a small hiccup due to gitlab permissions, only Patrick has permissions to merge to main, which is odd since we followed the instructions to a "t" when we set up the project (at least we think). But then after all that good stuff we wanted to add a couple issues so that we could start planning our days and what we were going to work on.

Tomorrow we plan to add authorization to our group endpoints, add additional issues and look into the gitlab permission.


October 9th - October 13th: Holiday


September 28, 2023

Today we created all of our tables and the team work was amazing. We each took a table and created the SQL for the table. Also we set up backend Auth which was a super long journey. It was awesome though we all coded together to ensure we set it up correctly since this is something that is super important and will protect our users/site so we wanted to make sure we did it correct. Oh and we also each wrote an endpoint for groups so that we can get the first ones done and test them together so we are all on the same page of expectations for code. And it went super smooth.

Tomorrow we plan to revisit backend auth to see if we want to update accounts to users or just continue as is. Then we want to create users table, so we can begin further into getting our app working. 


September 27, 2023

Today we finished our SQL set up and we set up DB/pg-admin but I am not sure if we are going to use pg-admin since we are thinking about setting up beekeeper too. And we like the simplicity of beekeeper more but it was great exposure to pg-admin. We updated API documentation again today but I feel like every change is almost like a new thing we learned / "realized" so it was awesome that we would think about these error possibilities and then kinda all have a pow wow to talk over if its worth the time to consider a change or move on with how it is. It was really awesome the discussion of code when we were working on documentation, I feel like we are really setting ourselves up for success by thinking of these things now instead of just going for it and then hitting error after error.

Tomorrow we plan on creating issues for our journal entries. Create user tables, set up backend Auth


September 26, 2023

Today we created additional user stories, and waited for our turn to present our MVP. While we waited we decided to just keep going through and ensure user story makes sense and that we were happy with all the set up we had so far. Oh we also kinda cut some things out as we were not sure if we would have enough time to do everything we were thinking of. I feel like we still have a big list of items to do but after going through and checking to see what we can move to our stretch goal section I feel like what we have to get done will keep us busy but also challenge us to work hard and improve our coding skills.

Tomorrow: We ran out of time to present today so we have some time to review our documents again. So the plan for Monday is that when we return and make sure there are no one additional changes we need and just double check everything is ready to present to the instructors


September 25, 2023: Holiday


September 22, 2023

Today we created additional user stories, and waited for our turn to present our MVP. While we waited we decided to just keep going through and ensure user story makes sense and that we were happy with all the set up we had so far. Oh we also kinda cut some things out as we were not sure if we would have enough time to do everything we were thinking of. I feel like we still have a big list of items to do but after going through and checking to see what we can move to our stretch goal section I feel like what we have to get done will keep us busy but also challenge us to work hard and improve our coding skills.

Tomorrow: We ran out of time to present today so we have some time to review our documents again. So the plan for Monday is that when we return and make sure there are no one


September 21, 2023

We are calling our wire frame done today!!!! So hopefully no more changes and only moving forward from here. We have decided that if given all the time in the world we could always think of additional code or components we would be able to add to our wire frame. Now that we agreed on a plan we need to start working on the MVP and API documentation. The API documentation seems very clear and since we discussed in depth our app with everyone we all split up the MVP in sections and decided to assign each other sections to help get the API documentation complete and so it gives everyone on the code look. Also tomorrow we are supposed to present our projects for approval so that is exciting but moving super quick.

Tomorrow we will present our project and hopefully get the green light to continue to start working on it and getting it all up and running. We will also be attempting to write a sql diagram of the data we are hoping to get and will update accordingly when we are referencing it.


September 20, 2023

Today: So far everything has been running smooth. Our group has great communication skills and is overall just an
awesome group of people. We are still making changes to the wire frame but I feel like the closer to our vision we get the escalidraw then it will definitely make up time if we are falling behind other groups since we will have a solid game plan and will be able to check out documentation and then go back to what is needed or not. We are now also in the talks of being ready to call the wire frame done however we are adding a few more changes and walking through each time so that we ensure we think of the user experience and how we would implement the code on the wire frame.

Tomorrow we will try to finalize our wire frame and start on the MVP, our group feel as though we are moving kinda slow, however we know once we finalize these documents the coding will start to just spill out and we will definitely catch up to the other groups once we start coding as things should run smooth based on us taking our time to catch some details that we would miss if not for having these in depth conversations


September 19, 2023

Today: Back at it again! Today we met back up as a group to continue discussing a plan on how to create our application and what functionality we would like to set as a goal for when we are ready to deploy to turn the application in. Something that I thought would be really cool, that I believe Patrick thought 
of an idea to make the app an exclusive social media app that will be less of like "you may know this person", "try and connect" its going to be about keeping the relationships you have or make that you want to put in effort to stay in touch with. I am really excited I feel as though our group is going to work well together. Also using escalidraw while wire framing has been awesome, escalidraw helps to draw out what you are thinking sometimes using it alone will help others see your vision. 

Tomorrow we will try to finalize our wire frame so that our group will have nice little game plan when trying to being writing code. 


September 18, 2023

Today we were told who we were going to pair with for our final project. We then were sent to a separate 
break out room where we were given time to brainstorm on our final project. What was awesome was Eliza actually had a great idea so we didn't really need to brain storm for too long. When We started talking about ideas for an app, she was awesome enough to let us use her idea of creating an event organizer app that focuses on making it easy to stay connected to your friends and family but exclusive enough to where you are not able to search for people to add as a friend you must be only invited by a code.

Tomorrow we will be continuing to brain storm as a new group, and maybe set some goals/expectations for when we begin writing code together for this project.
