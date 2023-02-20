# Kiddo's Care

<br>



## Description

Search platform for find babysitters in Lisboa and to employ, as well, babysitters.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage, log in, sign up and rules. 
- **sign up** - As a user I want to sign up on the web page so that I can use the service.
- **login** - As a user I want to be able to log in on the web page so that I can search for a babysitter or offer my service as one.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite and delete them.
- **profile** - As a user I want to be able to see my profile.
- **edit user** - As a user I want to be able to edit my profile.
- **rules** - As a user I want to see the list of rules of the service.
- **Babysitters listing** - As a user I want to see the list of babysitters.
- **BONUS chat** - As a user I want to talk with babysitters to be able to create an initial connection.



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }         
| `GET`      | `/private/profile`            | Private route. Renders `profile` form view.             |                                  |
| `GET`      | `/private/profile/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `POST`      | `/private/profile/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites`              | Private route. Adds a new favorite for the current user.     | { name, image}                                 |
| `POST`   | `/private/favorites/:babysitterId` | Private route. Deletes the existing favorite from the current user. |                                                          |
| `GET`      | `/babysitters`                     | Renders `babysitters-list` view.                              |                                                          |
| `GET`      | `/babysitters/details/:id`         | Renders `babysitters-details` view for the particular babysitter. |                                                          |
| `GET`      | `/rules`                     | Renders `babysitters-list` view.                              |     
| `POST`      | `/review/create/:id'`                     | Renders `babysitters-list` view.                              |     





## Models

```
User model

```javascript
{
 firstName {
    type: String,
    required: true,
    trim: true,
    },
lastName {
    type: String,
    required: true,
    trim: true,  
},
email {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
},
phoneNumber {
    type: Number,
    required: true,
    trim: true,
    unique: true,
}
 password {
    type: String,
    require: true,
},
image {
    type: String,
    required: true,
},
babysitter: Boolean,
age {
    type: Number,
},
experience {
    type: String,
},
criminalRecord {
    type: String,
},
disponibility: [{
{
   day: String,
   slot: {
    type: [String],
    enum: ["morning", "afternoon", "night"]
   }
}
}],
linkedin {
    type: String,
},
language {
    type: String,
},
area {
    type: String,
},
favorites {
    type: Schema.Types.ObjectId,

    },
reviewsWritten: [{ type: Schema.Types.ObjectId, ref: "Reviews"}],
reviewsReceived: [{ type: Schema.Types.ObjectId, ref: "Reviews"}],
}


Reviews model
{
author: [{ type: Schema.Types.ObjectId, ref: "User"}],
receiver: [{ type: Schema.Types.ObjectId, ref: "User"}]
content {
    type: String,
}
  rate: Number,
}

```
<!-- disponibilidade: [{
    day: "2ª",
    slots: ["manha", "tarde"]
},
{
    day: "3ª",
    slots: ["manha", "tarde"]
},
{
    day: "4ª",
    slots: ["manha", "tarde"]
}]
 -->
<br>

## API's


<br>


## Packages



<br>



## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)



<br>



## Links

api for the language: https://restcountries.com/

api for the area: 


### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors
FirstName LastName - [`<github-username>`](https://github.com/person1-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person1-username)

FirstName LastName - [`<github-username>`](https://github.com/person2-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person2-username)