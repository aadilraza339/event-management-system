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
# How to run the Project?
* `npm install`
*  create `.env` file and config
*  Run these files `/app/models/db-event.js` , `/app/models/db-user.js` for create tables
*  `nodemon app.js` for run the server.
# Events routes
````
USER Endpoint
user.post('/signup', User.signup) 
user.post('/login',User.login)  
user.get('/users',User.usersByAdmin) 
user.get('/users',User.myEvents)  
````
````
Events Endpoint 
event.post('/createEvent', Event.CreateEvent) 
event.post('/editEvent/:eventId', Event.EditEvent) 
event.delete('/deleteEvent/:eventId', Event.DeleteEvent)
event.get('/usersEvents', Event.usersEvents)  
event.get('/events', Event.Search) 
````
> http://localhost:8000/event/signup / signup
````bash
  { 
    "name":"exmple",
    "email":"venu@gmail.com",
    "password":"9873752914",
    "phone_num":"9736463632"
  }
````
> http://localhost:8000/event/login / login
````bash
  { 
    "name":"exmple",
    "email":"venu@gmail.com",
    "password":"9873752914",
    "phone_num":"9736463632"
  }
````
# Tables
````
+----+-------+----------------+----------------------------------------------------------+------------+-----------+
| id | name  | email          | password                                                 | phone_num  | user_role |
+----+-------+----------------+----------------------------------------------------------+------------+-----------+
|  2 | aadil | a@gmail.com    | sha1$05b2d051$1$2f262132a636b1a3ff588aefcfc08316c0a2b802 | 9971829021 | admin     |
|  8 | sunil | s@gmail.com    | sha1$eb157c5e$1$5ca5ba30471e286de53f5c33aa00a6d30d432dc3 | 9971829021 | user      |
|  9 | venu  | venu@gmail.com | sha1$9ebecf92$1$21239c17ff13a5d6d133201075cafacecca47f4d | 9736463632 | user      |
+----+-------+----------------+----------------------------------------------------------+------------+-----------+
````

