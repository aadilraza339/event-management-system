# Event-management-system

### What is the task
````
Create a nodejs application which contains 2 models
1.User model with user details like name, email, phone number, role(should be either admin or user).
2. Event model with event name, description, start date , end date, city.

App summary - 

User should be able to sign up and login with email. Use JWT token for authentication. Post that user can create events. Api calls needed

1. Sign up api, Login api (Without auth token)
2. Create event, update event and delete event. (With auth token, only user who created the event can update or delete)
3. Search events based on name and city. It should have sort also. ex - sort_by=“name”, sort_type=“asc/desc” (Without auth token, user can view all events)
4. Fetch all users (only admin should be able to do this)(With auth token)
5. Fetch all users and corresponding events (only admin)(With auth token)
6. Fetch all events by the user (With auth token)
````
___

# Events routes
````
user.post('/signup', User.signup)  <br>
user.post('/login',User.login)  <br>
user.get('/users',User.usersByAdmin)  <br>
user.get('/users',User.myEvents)  <br>
````
Events endpoint <br>
event.post('/createEvent', Event.CreateEvent) <br> 
event.post('/editEvent/:eventId', Event.EditEvent)  <br>
event.delete('/deleteEvent/:eventId', Event.DeleteEvent) v
event.get('/usersEvents', Event.usersEvents)  <br>
event.get('/events', Event.Search) <br> 

