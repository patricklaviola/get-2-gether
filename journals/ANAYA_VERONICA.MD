## October 26, 2023
Today, I worked on updating the APIdocumentation.md file to accurately reflect any new and existing endpoints. It took longer than I anticipated because I had to go through about 700 lines of code and ensure that everything was formatted correctly. Afterward, I started working on our README.md file, while the rest of the group tried to resolve some kinks in the code and styling issues. We are almost done with our project but tomorrow we will likely need to run through our application one last time to ensure everything is working properly and ready for presentation.

While working on all this documentation today, I learned some new Markdown syntax, such as creating items that open and close to display more information and how to include code blocks. Pretty cool stuff!

## October 25, 2023
Today, I started my morning by transforming my "Create Group" form and "Add Group Member" form into modals. It was relatively easy because I basically just had to update the JSX styling. However, when I was testing out my modals to ensure they were still functional, I realized there was an issue with my "Add Group Member" form. Initially, my "Add Group Member" form displayed a dropdown of all the groups created by the user and a dropdown of all the users. The idea was that the "Add a Group Member" button would be displayed on the group dashboard, and I realized that it didn't make sense to have a dropdown that displays all the groups if I'm only trying to add a user to the specific group dashboard that I'm already in. So, I had to edit my "Add Group Member" form to remove the group's dropdown menu and, on submit, add the selected user to the group based on the group ID extracted from the group dashboard URL. I also had to edit my "Create Group" form so that when the user creates a group, they are automatically added to the group as a group member, and the new group populates in their dashboard under "My Groups."

Today, I gained a better understanding of how userParams() works because I had to use it in my "Add Group Member" form to fetch the group ID from the URL and pass it into the POST request when adding the selected user to the group based on the group ID extracted from the URL.

## October 24, 2023
Today, I updated the group_members SQL to add a UNIQUE(group_id, user_id) constraint. It solved the problem I was having where my "Add Group Member" form was allowing me to add the same user to a group twice. Then I wanted it to display a success message when a user was successfully added to a group or an error message if the user was already in the group. That took me a while to figure out because the message would not disappear from the page when I tried to add the next user. I had to use setTimeout(), which resets the message and makes it disappear after a certain amount of time. I also had an issue with my useEffect() for getGroups(). I was getting an error in my terminal: "React Hook useEffect has a missing dependency: 'getGroups'. Either include it or remove the dependency array." I tried adding the dependency and then removing it and just passing an empty list, but neither seemed to resolve the issue. I had to add a line of code in my useEffect(): "// eslint-disable-next-line react-hooks/exhaustive-deps," which tells ESLint not to raise a warning about the missing dependency.

Today, I learned how to implement the setTimeout() function, which is very useful in making your application responsive.

## October 23, 2023
Today, I continued working on the "Add Group Member" form, and I also created a new endpoint that retrieves a list of all user accounts. We merged the "Create Group" form into the main branch, and everything seems to be working well with that. However, I am having an issue with the "Add Group Member" form. It allows me to add the same user to the same group multiple times, which is not what we want. The only solution I think would be adding a UNIQUE constraint to our SQL table for group_members. That way the same user_id and group_id cannot be added simultaneously to the table twice. Tomorrow, I think we will have to update our group_members table to add that constraint, and then hopefully I will be able to resolve the issue with duplicate data in the group_members table.

Today, I learned how to update some Bootstrap styling for the "Create a Group" button!

## October 19, 2023
Today, Eliza and Nadine started working on the application styling. Patrick was able to complete the deployment and get unit tests to pass. I started working on the "Create a Group" form, and I was having trouble fetching the user's ID from the token and setting it as the creator_id when the group is created. I was finally able to get it to work by importing useToken from the galvanize-inc/jwtdown-for-react library and using it in useEffect. It checks if there is a token and an account in the token and then takes the token.account.id and sets it as the creator_id.

## October 18, 2023
Today, we continued working on deployment, and it looks like we are now finished with frontend and backend deployment. However, there is a small issue we are having with the unit test job passing. We will revisit this issue tomorrow. We all started working on our unit tests for the endpoints. I wrote unit tests for the messages endpoints, and I got them all to pass!

## October 17, 2023
Today, we started working on the frontend of our application. I began working on the login and logout functionality on the frontend. I ran into a couple of blockers about "syntax error" and an "unexpected token" error. I had to troubleshoot for about an hour and I rebuilt my Docker containers, but it did not fix the issue. Finally, I ended up renaming one of the files from .env.sample to .env, and that cleared up the problem. I then ran into another issue when testing out the logout button where I had to refresh the page in order for logout to work. I ended up having to write a function that would simultaneously get passed through an onClick button that would log out the user and refresh the page at the same time and redirect them to the login page.

## October 16, 2023
Today, we worked on deploying our application. It looks like we followed all the directions correctly, but we ran into an issue towards the end, and therefore deployment did not work. Tomorrow, we will reach out to the instructors to see if they can provide any advice on what the issue may be. We also tested and merged everyone's endpoints into the main branch, and we are ready to start working on the frontend!

## October 15, 2023
Today, I finalized the group members API endpoints. I also finished the merge request description and tested all my endpoints to ensure they are working before we merge to main tomorrow.

## October 13, 2023
Today, I continued working on my group members API endpoints. I figured out how to return the group name and user name in my response by joining three different tables together. This weekend, I plan on updating the API documentation and filling out the description for my merge request and testing all my endpoints again before I merge them.

## October 12, 2023
Today, everyone was assigned the endpoints that they will be working on individually. I managed to write API endpoints for the group_members table, and they all seem to be working properly. However, I need to figure out how to return the group name and user details in the response versus just returning the ID integers. Tomorrow, we will review each other's work, and if everything is working properly, we will merge to main and start working on the front end.

## October 11, 2023
Today, we went over our groups and authorization endpoints again and updated them to reflect the changes we made in our tables yesterday. We also tested them to make sure they were still working properly. We also created the files in the queries and routers folders for events and messages, where we will be writing code for those endpoints. Tomorrow, we plan to finalize our groups endpoints and split up the remaining endpoints among each other so we can work on them individually.

## October 10, 2023
Today, we reviewed and updated some of our SQL tables. We updated user_id to creator_id and added a date/time column to the events table. Previously, we were having issues where only Patrick could merge into main, but this morning Rosheen was able to help us with our settings in GitLab, and I was finally able to merge into main for the first time today!

Tomorrow, we will be going over our backend authentication to make sure all the variables reflect our API documentation.

## October 9, 2023
Last night, I worked on creating the "create a group" API endpoint for our project. Today, the group went over each other's endpoints together and tried to troubleshoot wherever anyone needed help. I was able to use Beekeeper today to view and interact with the database. It appears that my endpoint is working; however, we will need to revisit our SQL tables to make sure we are staying consistent with the variables everyone is using.

Once I started working on my endpoint, I felt like things started to make more sense, and I have a better understanding of what the "queries" and "routers" folders do.

## September 28, 2023
Today, we began trying to implement authorization on the backend. We got some of it done together as a group; however, it is still a work in progress. We were also able to create the SQL tables for our database.

We were finally able to connect our project to Beekeeper, which was very exciting!

## September 27, 2023
Today, we decided we would use PostgreSQL database for our project and implemented it together as a group. We also set up pgAdmin together as a group so that we are able to interact with our database. We also created journal files for each person in our group to document our progress on this project.

I finally understand the main differences between PostgreSQL and mongo db.
