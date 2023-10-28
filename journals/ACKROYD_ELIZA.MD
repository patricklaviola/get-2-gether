## Week 18 D4, Oct 26

Last Journal! We got a lot done today, namely ensuring the flow of the links all work smoothly, testing new endpoints, testing final deployment...

Namely, we mob programmed for the group dashboard side menu, filtering to:

- only display OTHER users in the members list
- add a group admin tag for the group admin's name
- display those remove group member buttons next to the group members only if the admin is the logged in user

### Tomorrow

Present!

## Week 18 D3, Oct 25

Biggest win by far, or so it feels: we figured out how to redirect from login to the personal dashboard.

- We understood that we needed to wait for the token to set in our cookies/AuthContext. Initial patch was to use setTimeout for appx 500 ms, to allow time for cookie to set. Navigating to personal dashboard and rendering correct info on successful login! However, the unsuccessful login was still navigating, to an empty dashboard, which wasn't what we wanted.
- The fix? We import token auth context, and set that token as a dependency for the useEffect in the login/signup form page. In the useEffect when it's triggered by the change in state from token, we check the token is valid and if it is we redirect.
  - stretch goal will be implementing a timeout message like veronica did for her add a group member form that displays an unsuccessful message

I added a delete event attendee endpoint, however we realized we needed the attendee instance of a group member to be mass deleted from the database when a group member was deleted. I did this by altering the delete group member endpoint:

- first, I needed the group id as we only had the member id. then, the event attendees are deleted based off of the member's user_id, and all event ids associated with that group. I did this by selecting all events with that group_id.
- then, we can delete that group member based off of the passed in member id!

The useEffect breakthrough was HUGE. The links for the groups weren't triggering because I wasn't refreshing the SPA! The useEffect needed to be re triggered. So, after a patch where we added the button, useNavigate, and window.location.reload(), I realized I could just pass in groupId useParam into the useEffect dependency array. Also, I passed in change triggers to the useEffect dependency, to trigger a useEffect call when those states change (i.e. when a modal posts a group member or group).

We did a lot of mob programming today, and removed side menu component from personal dashboard and group dashboard and made it into its own child component all together. We then refactored, and added conditionals to display the right info per dash requirement.

We put our Modal components into the group dashboard and passed in necessary props

### Tomorrow

Need to finalize everything, redeploy, and test deployment! Also, add filtering to the side menu

## Week 18 D2, Oct 24

I added icons for the messages, which are pixel art C3PO and a storm trooper. Trying to get the images to show up was difficult, and it turns out the img src needed the path to start from the CWD. So, we moved the .png files into SRC folder, and added an icons folder.

I added the functionality for the logged in user, if they are the group creator, to delete members from the group. I matched the user_id of the logged in user to the creator_id field of our group data, and conditionally rendered group members in the side menu with a remove button if the logged in user had "permission".

### Tomorrow

I want to figure out why these links in the side menu aren't navigating away from the page!

## Week 18 D1, Oct 23

Today I added functionality to "poll" messages! I did some research, but I ended up going with a SetInterval, every 2000 ms that calls fetchMessages, in the useEffect.

I also made the buttons to update the logged in users' event status active. I made 3 handle clicks, which was an interesting puzzle:

- The update attendee status (which I wrote...) uses the attendee_id in the url path, not user_id, not event_id, or anything I had to work with. So, I needed to first loop through all attendees of the event, which meant calling that endpoint, then identify the attendee with the same user_id as the logged in user. After that, I make the put request with the corresponding status as the button.

The messages' ordering was not in the correct order, due to Date issues when posting. Nadine changed the messages table to NOT NULL, and default to a current timestamp, which then allowed the message to be time stamped accurately. This, coupled with a correct ORDER BY in the database then allowed the messages to be displayed in the right order.

### Tomorrow:

Continue styling, need to integrate components into the dash!

## Week 17 D4, Oct 19

Finished the MVP, bare minimum for group dash and merged it in. With the added API endpoint get groups by user_id, I was able to add those links in the side menu. The links when clicked show the correct path in the url bar, but don't re render the page?

With the fixed messages table, the message info from API call return user_name, so we can now display that and the correct, accurate timestamp for the messages in the chat. I also got the scroll to start at the bottom for the chat! Required 2 transform: rotate(180deg) in the appropriate divs.

### Next week:

- Group dashboard needs styling, websockets for chat?, event status for events to make links active

## Week 17 D3, Oct 18

Today as a group we deployed frontend, or should I say Patrick deployed the front end.

USEPARAMS. Is how you fetch info from the URL, to pass in to your components. This breakthrough allowed me to then complete my API calls, and test them through console logs to make sure I was getting data back.

I got the chat feature working, and the biggest/most exciting thing has been the components I broke the page into. I messed around with Bootstrap for about an hour, and figured out how to make:

- OffCanvas Menu, and collapsable sections! The data-bs-toggle needs to equal collapse, and you need to set the target of that button to the id of the component you want collapsing. So neat. As a note: if you're using Bootstrap 5, you NEED to include bs in the middle. Also, work off of the Bootstrap 5 website, not 4. Unnecessary headache.
- I found a chat template, and before rendering one side of the message card or the other I check to see if the logged in user_id matches the user_id of the message coming in.
- Found a car template I liked and mapped the cards into a grid.
- For column components, I implemented an overflowY: scroll, to keep it tidy and allow for a chat feel

### Biggest hurdle of the day

Was figuring out how to put the event component and chat component into two columns! Nadine ended up helping fix that in about 5 minutes, after I had struggled with it for about 45 mins. Needed "col-6" in the right parent div.

### Tomorrow

- Need to get user_name for related message and test filtering based on logged in user
- Need to do profile picture, maybe add a column to the database
- Figure out the datetime string for the message post so it creates the current timestamp
- Fix the get groups based on user id so that you can fetch the groups based off of user id
- Get the message scroller to start at the bottom
- Fix the event status buttons on the event cards
  Websockets for the messages and calendar

## Week 17 D2, Oct 17

STARTED THE FRONT END TODAY! Also deployment, but we're blocked due to the kubernetes instance being locked.

I'm assigned to the group dashboard, which I am really excited to work on. But first, I started our unit tests.

I wrote the Unit Tests for the events endpoints, and one for a group endpoint. Unit tests, are tricky. My first challenge was with dependency overrides, to access protected endpoints. Hey at least we know they're actually protected!

I FINALLY understood what Paul was talking about in his lecture, making fake methods and accounts to pass in to the dependency injections in our router params, in order to bypass the account verification and any unwanted SQL execution. It was also fascinating understanding which functions needed which exact parameters as the repo function calls in our routers, that the override functions were simulating. Also very cool underscoring what our endpoints do with the data passed in, when we simulate the data structure in the return and in the request. It took me a solid few hours to write seven tests. But it was so satisfying when they finally passed!

Then I started on the group dashboard. The first thing I did was set up our API calls and make sure those were working, for fetch events by groupId, fetch group members by groupId, messages by groupId.... first I need to know how to get the groupId from the url? Sounds like a help me understand for tomorrow.

### Tomorrow

Figure out how to fetch group ID from URl, and continue working on group dash:

- Event card grid
- Side menu that lists group members, group links to navigate to other groups you're part of?
- CHAT FEATURE! And polling for messages....

## Week 17 D1, Oct 16

Today we reviewed our endpoints and went through them as a group. We updated our merge request descriptions, as we've been lacking on having the detail we need.

We merged our backend into main! Excited to start our CI/CD tomorrow.

## Week 16 D5, Oct 13

I finished my endpoints:

- Create Event Attendee
- Get all attendees
- Get list of attendees for an event
  - This was the most interesting to write. We want to return a list of attendees with the User Name present. This required an inner join with the users table, to fetch the user_name and user_id for easy access for display in the front end. From there, I needed to figure out how to add each row to a list, which was trickly. I started by using helper functions, and for each row in the fetchall I called the function to make it into a list, which called a function to make the JSON dictionary. I ended up pivoting and initializing the return list right in the function, then looping through the fetchall and adding a EventAttendeeOut Pydantic model to the list. This was per the suggestion of Jordan, our SEIR.
- Update Attendee Status
  - We Decided to initialize the status of a new event attendee to "Not Seen", before they update the status when they see the event. Otherwise a pretty straightforward put.

### FOR MONDAY:

I have my endpoints finalized, as a group we'll review and plan next steps.

## Week 16 D4, Oct 12

Today we finalized auth for the group related endpoints. We really worked as a group to understand how the token works, and how to pass the auth in to the dependency for account data in the router. We spent some time trying to understand the jwt-down documentation, which helped us conceptualize what was happening there.

We created issues for each of us to tackle endpoints. It worked out, since we have Events, Group Members, Event Attendees, and Messages to tackle, so we each grabbed an endpoint grouping and went to work.

I'm assigned to the Event Attendees endpoints.

## Week 16 D3, Oct 11

Today we changed all instances of the variable account to user. This is more in line with our project ideation, as it's a social/user based platform. Yesterday we FINALIZED up our tables, woohoo! and today we added auth to our group endpoints we created. We mob programmed for this bit, which was helpful before we start our own endpoint clusters.

## Week 16 D1, Oct 9

### Over break:

- We implemented backend Auth as a team. This was awesome to go through as a group, coding through a VSCode liveshare we were able to work together. We followed Cutis' video and were able to successfully implement! Woohoo! This was interesting, because:
  - We set up the Token endpoints, and it's our first experience with Pydantic models. Very interesting that you need to define different models for AccountIn vs Out? It's much more defined and personalized compared to Django. We define the JSON structure for both request and response. Very cool.
  - Generating our Signing Key was hard, because I didn't know how to download that open SSL algorithm/program Paul suggested! So frustrating. But Nadine was able to generate a random string, which we used no problem.
- We each wrote an endpoint for the groups endpoints. I wrote View Group Details, which gets a group by group id.

### Today:

We merged and tested group endpoints as a group. It was amazing to see them pop up in Swagger for the first time!

### Tomorrow

Divide up the rest of the endpoints, fix API documentation. We realized we will probably need to leave movies as a stretch goal.

## Week 14 D3, Sept 28

Today's the last day before break, and we connected our beekeeper to our database. We're planning our gameplan for break, and we want to tackle backend Auth before we get back to class.

### For Break

Work on backend Auth and work on View Group Details Endpoint

## Week 14 D2, Sept 27

We finalized our Model Diagrams, and we feel good about how we set those up. We also decided we want to use SQL over Mongo, since we are going to have HIGHLY relational databases.

We set up our PostgreSQL database, and my groupmate Veronica took the lead on that while we mob programmed the set up. My teammate Nadine also took the lead on setting up PgAdmin, which we had to create volumes and containers for our docker to host. I'm really enjoying working as a group.

I've been brushing up on my FastAPI from the learn, and am planning how we're going to set up backend. Backend auth is very daunting at this point!!

### Tomorrow

Work on setting up database and connecting to beekeeper/pgAdmin

## Week 14 D1, Monday Sept 25

We presented our indepth proposal today! While we saw someone's presentation in class, I realized we didn't have a SQL diagram, so I made one quickly to propose to my group. This included:

- Tables for groups, group_members, events, event_attendees, users, movies, ratings, messages, and chat
  Rosheen helped us finalize our foreign keys and our tables, we went back and forth on how to list members, friends, attendees, etc. One option was to append to a string the user id in an attendee column for each event, but we settled on junction tables.

We added API documentation to our project, and we took turns pulling and pushing to practice flow.

### Tomorrow

Finalize API documentation, begin endpoints(??)

## Week 13 D5, Friday Sept 22

We created in depth UX/user stories for each planned dashboard. We have:

- Personal Dashboard, only accessible by a logged in user
- Group Dashboard
  - This will have an events tab and a movies tab, which when selected will display a grid of cards displaying the info
- Created a stretch goals section, since we know we might be dreaming too big, we're all just too excited. For now, we're going to focus solely on movies, but hopefully we get to:
  - Expanding interests into more than just movies, like restaurants members want to try
  - Yelp/Google Maps API to integrate ratings and pictures into the cards
  - For events that transpired, allow a page for all members to post pictures they took from the event so everyone can see them all

### Tomorrow

We need to finalize our API documentation to present on Friday. I took the Events grouping, so List events by: User and Group, View event Details, Create/Update/Delete an event.

## Week 13 D4, Thursday Sept 21

More wireframing, and we starting writing out the user experience explicitly. We're tinkering with the design in excalidraw, but it's mostly finalized now. We're moving on to user story and MVP detailing.

We needed to figure out how we invite users to our site, and how a user invites in friends from outside the website. We want to look into potentially using an email API to send emails to new users with a group code that once they press it will navigate them to our sign up page, where the group UUID can be input and will automatically add them to their first group.

Some kinks included:

- How do we display the friends list? Dropdown in a side menu?
- Should we only have upcoming events in our personal dashboard?
- What should bare minimum sign up look like? Should we just provide new users with a code and forgo the email?

### Tomorrow

Finalize MVP and begin API documentation

## Week 13 D3, Wednesday Sept 20

Today I made a group google doc so we can live edit an MVP detailing the user experience, and have a place to put our API documentation. So far, we're pretty early in the ideation of the project and where it's going, and I'm a little nervous to jump into FastAPI. I know once we get going it'll come quick, starting is always the hardest. We're working on the design of our Wireframe, and starting to imagine the structure of data flow that we'll need and how that should look. Definitely starting to become a project!

### Tomorrow

Continue wireframing and detailing MVP/user experience.

## Week 13, D2, Tuesday Sept 19

Today we started our wireframe. Essentially we are planning on creating a profile page and a group page to display group information. We want the profle page to be able to display sections for all events, movies, and groups specific to the user. We're working out some of the kinks, and mostly focusing on styling. Should the page be visible/navigable to friends? Should we have a profile picture?

The group dash is going to be really interesting. We want to display the events for the groups as a grid of cards, and my groupmate Nadine suggested adding a chat feature for group members to live message in the groups. I'm super excited about this -- from what we've been told, we can implement web sockets or use a poller for a chat. Web sockets would be really cool to implement and I remember them from the previous cohort's presentations, but I don't know what they entail.

### Tomorrow

We're going to keep working on the wireframe! Love working on the design element, makes me excited at the idea of being able to build something we imagine on our own!

## Week 13 D1, Monday Sept 18

Today we pitched project ideas, and we had an idea to simplify the frustrations that come with trying to plan any sort of event in a group text. The information gets lost in the thread, it's impossible to keep track of who said they wanted to come or who can't make it. I want to make something that will allow people to circumvent all of that noise and post in the group an event, the time, location, and let people indicate right there in the event whether or not they're coming. It could be as small as a dinner out at a restaurant you want to try, a wine and paint night, a movie night, or something bigger like a camping trip or even a bachelorette party. The group texts that get formed around these events can be translated to a website or app, and then all related events are easily accessible and visible.

My group mate Patrick expanded on that idea and said we should add sections for people to post interests and ideas for things the group should try together. A group member can post a movie they're interested in seeing, and other members could rate that movie, book, video game, etc. Excited to expand on this and see what this could shape into!

### Tomorrow

We continue shaping our plan and develop our wireframe
