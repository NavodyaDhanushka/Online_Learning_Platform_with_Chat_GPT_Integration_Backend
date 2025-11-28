# Online Learning Platform with ChatGPT Integration

This document provides a complete and structured overview of your Online Learning Platform with ChatGPT Integration,
including architecture, ER diagrams, backend and frontend setup, authentication, API endpoints, and deployment
instructions for AWS EC2 (Linux).

## Documentation

[Documentation](https://drive.google.com/drive/folders/1v6Yr96CHGJX68iRE91g1YuhDwScRuC2E?usp=drive_link)

## Tech Stack

**Frontend:** React + Tailwind + React Router

**Backend:** Node.js + Express + MongoDB (Mongoose)

**AI Service:** OpenAI / ChatGPT API integration

**Auth:** Node.js + Express + MongoDB (Mongoose)

**Deployment:** AWS EC2 (Ubuntu)

## Features

- Browse courses
- View course details
- Enroll in courses
- Ask AI-powered questions using ChatGPT integration
- Admins can create/update/delete courses

## API Reference

#### User Register

```http
  POST /api/register
```

| Parameter  | Type     | Description                  |
|:-----------|:---------|:-----------------------------|
| `name`     | `string` | **Required**. Your full name |
| `username` | `string` | **Required**. Your username  |
| `password` | `string` | **Required**. Your password  |

```jsone
{
  "name": "Alice Perera",
  "username": "alice_instructor",
  "password": "alice12345",
  "role": "instructor"
}
```

Response

```jsone 
{
    "message": "User logged in successfully",
    "user": {
        "id": "6929358bd8eaa8a920c086c4",
        "name": "Alice ",
        "username": "alice",
        "role": "instructor"
    }
}
```

#### User Login

```http
  POST /api/login
```

| Parameter  | Type     | Description                 |
|:-----------|:---------|:----------------------------|
| `username` | `string` | **Required**. Your username |
| `password` | `string` | **Required**. Your password |

```jsone
{
  "username": "navodya123",
  "password": "12345678"
}
```

Response

```jsone 
{
    "message": "User logged in successfully",
    "user": {
        "id": "6923c13e39026780116786fa",
        "name": "Navodya Dhanushka",
        "username": "navodya123",
        "role": "student"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjNjMTNlMzkwMjY3ODAxMTY3ODZmYSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzY0MzA4NDkxLCJleHAiOjE3NjQ5MTMyOTF9.fCLeC6KiKyEaLqWnBZil1lw6S_1PG0z7fjO9m3rA6w0"
}
```

#### Create Courses

```http
  POST /api/courses/
```

| Parameter     | Type     | Description                       |
|:--------------|:---------|:----------------------------------|
| `title`       | `string` | **Required**. Course title        |
| `description` | `string` | **Required**. Course description  |
| `content`     | `string` | **Required**. Your Course content |

```jsone
{
  "title": "Java Masterclass",
  "description": "Master the four pillars of OOP in Java.",
  "content": "Covers classes, objects, inheritance, polymorphism, abstraction, and interfaces."
}
```

Response

```jsone 
{
    "message": "Course created successfully.",
    "course": {
        "title": "Java  Masterclass",
        "description": "Master the four pillars of OOP in Java.",
        "content": "Covers classes, objects, inheritance, polymorphism, abstraction, and interfaces.",
        "instructor": "6923c3dee5d3ed848a678ab9",
        "enrolledUsers": [],
        "_id": "692937f6d8eaa8a920c086cc",
        "createdAt": "2025-11-28T05:49:42.596Z",
        "updatedAt": "2025-11-28T05:49:42.596Z",
        "__v": 0
    }
}
```

#### Get Courses

```http
  GET /api/courses
```

| Parameter | Type | Description                   |
|:----------|:-----|:------------------------------|
| `none`    | `-`  | Returns all available courses |

Response

```jsone 
{
        "_id": "6923e8c991f7533ee6b8fd65",
        "title": "HTML & CSS Fundamentals",
        "description": "Understand how to build static web pages using HTML.",
        "content": "Covers HTML tags, CSS selectors, box model, flexbox, and responsive design.",
        "instructor": {
            "_id": "6923c3dee5d3ed848a678ab9",
            "name": "John Instructor",
            "username": "john_instructor",
            "role": "instructor"
        },
        "enrolledUsers": [
            {
                "_id": "6923c13e39026780116786fa",
                "name": "Navodya Dhanushka",
                "username": "navodya123",
                "role": "student"
            }
        ],
        "createdAt": "2025-11-24T05:10:33.120Z",
        "updatedAt": "2025-11-26T09:16:36.719Z",
        "__v": 1,
        "isEnrolled": false
    },
```

#### Get Course by ID

```http
  GET /api/courses/{id}
```

| Parameter | Type     | Description                      |
|:----------|:---------|:---------------------------------|
| `id`      | `string` | **Required**. Course ID to fetch |

Response

```jsone 
{
        "_id": "6923e8c991f7533ee6b8fd65",
        "title": "HTML & CSS Fundamentals",
        "description": "Understand how to build static web pages using HTML.",
        "content": "Covers HTML tags, CSS selectors, box model, flexbox, and responsive design.",
        "instructor": {
            "_id": "6923c3dee5d3ed848a678ab9",
            "name": "John Instructor",
            "username": "john_instructor",
            "role": "instructor"
        },
        "enrolledUsers": [
            {
                "_id": "6923c13e39026780116786fa",
                "name": "Navodya Dhanushka",
                "username": "navodya123",
                "role": "student"
            }
        ],
        "createdAt": "2025-11-24T05:10:33.120Z",
        "updatedAt": "2025-11-26T09:16:36.719Z",
        "__v": 1,
        "isEnrolled": false
    }
```

#### Enroll to a Course

```http
PUT /api/courses/enroll/{courseId}
```

| Parameter  | Type     | Description                          |
|:-----------|:---------|:-------------------------------------|
| `courseId` | `string` | **Required**. ID of course to enroll |

Response

```jsone 
{
    "message": "Course enrolled successfully.",
    "course": {
        "_id": "692937f6d8eaa8a920c086cc",
        "title": "Java  Masterclass",
        "description": "Master the four pillars of OOP in Java.",
        "content": "Covers classes, objects, inheritance, polymorphism, abstraction, and interfaces.",
        "instructor": "6923c3dee5d3ed848a678ab9",
        "enrolledUsers": [
            "6923c13e39026780116786fa"
        ],
        "createdAt": "2025-11-28T05:49:42.596Z",
        "updatedAt": "2025-11-28T06:11:19.619Z",
        "__v": 1
    }
}
```

#### Get Enrolled Courses for User

```http
GET /api/courses/enrolled
```

| Parameter | Type | Description                          |
|:----------|:-----|:-------------------------------------|
| `none`    | `-`  | Returns courses the user enrolled in |

Response

```jsone 
{
    "success": true,
    "message": "Enrolled courses loaded successfully",
    "courses": [
        {
            "_id": "6923e8c991f7533ee6b8fd65",
            "title": "HTML & CSS Fundamentals",
            "description": "Understand how to build static web pages using HTML.",
            "content": "Covers HTML tags, CSS selectors, box model, flexbox, and responsive design.",
            "instructor": {
                "_id": "6923c3dee5d3ed848a678ab9",
                "name": "John Instructor",
                "username": "john_instructor",
                "role": "instructor"
            },
            "enrolledUsers": [
                {
                    "_id": "6923c13e39026780116786fa",
                    "name": "Navodya Dhanushka",
                    "username": "navodya123",
                    "role": "student"
                }
            ],
            "createdAt": "2025-11-24T05:10:33.120Z",
            "updatedAt": "2025-11-26T09:16:36.719Z",
            "__v": 1
        },
        {
            "_id": "6923e8d491f7533ee6b8fd68",
            "title": "Node.js for Beginners",
            "description": "Introduction to server-side development using Node.js.",
            "content": "Covers setting up Node.js, creating a simple server, working with Express, and connecting to a database.",
            "instructor": {
                "_id": "6923c3dee5d3ed848a678ab9",
                "name": "John Instructor",
                "username": "john_instructor",
                "role": "instructor"
            },
            "enrolledUsers": [
                {
                    "_id": "6923c13e39026780116786fa",
                    "name": "Navodya Dhanushka",
                    "username": "navodya123",
                    "role": "student"
                }
            ],
            "createdAt": "2025-11-24T05:10:44.205Z",
            "updatedAt": "2025-11-25T15:32:25.113Z",
            "__v": 1
        },
    ]
}
```

#### Get Assigned Courses for Instructor

```http
GET /api/courses/instructor
```

| Parameter | Type | Description                              |
|:----------|:-----|:-----------------------------------------|
| `none`    | `-`  | Returns courses the instructors assigned |

Response

```jsone 
{
    "success": true,
    "data": [
        {
            "_id": "6923e8c991f7533ee6b8fd65",
            "title": "HTML & CSS Fundamentals",
            "description": "Understand how to build static web pages using HTML.",
            "content": "Covers HTML tags, CSS selectors, box model, flexbox, and responsive design.",
            "instructor": {
                "_id": "6923c3dee5d3ed848a678ab9",
                "name": "John Instructor",
                "username": "john_instructor",
                "role": "instructor"
            },
            "enrolledUsers": [
                "6923c13e39026780116786fa"
            ],
            "createdAt": "2025-11-24T05:10:33.120Z",
            "updatedAt": "2025-11-26T09:16:36.719Z",
            "__v": 1
        },
        {
            "_id": "6923e8d491f7533ee6b8fd68",
            "title": "Node.js for Beginners",
            "description": "Introduction to server-side development using Node.js.",
            "content": "Covers setting up Node.js, creating a simple server, working with Express, and connecting to a database.",
            "instructor": {
                "_id": "6923c3dee5d3ed848a678ab9",
                "name": "John Instructor",
                "username": "john_instructor",
                "role": "instructor"
            },
            "enrolledUsers": [
                "6923c13e39026780116786fa"
            ],
            "createdAt": "2025-11-24T05:10:44.205Z",
            "updatedAt": "2025-11-25T15:32:25.113Z",
            "__v": 1
        },
    ]
}
```

#### Update Courses

```http
PUT /api/courses/{courseId}
```

| Parameter  | Type     | Description                          |
|:-----------|:---------|:-------------------------------------|
| `courseId` | `string` | **Required**. ID of course to Update |

```json
{
  "title": "HTML Fundamentals",
  "description": "Updated description: Understand how to build static web pages using HTML.",
  "content": "Updated content: Covers HTML tags, CSS selectors, box model, flexbox, and responsive design."
}
```

Response

```jsone 
{
    "message": "Course updated successfully.",
    "course": {
        "_id": "6923e8c991f7533ee6b8fd65",
        "title": "HTML Fundamentals",
        "description": "Updated description: Understand how to build static web pages using HTML.",
        "content": "Updated content: Covers HTML tags, CSS selectors, box model, flexbox, and responsive design.",
        "instructor": "6923c3dee5d3ed848a678ab9",
        "enrolledUsers": [
            "6923c13e39026780116786fa"
        ],
        "createdAt": "2025-11-24T05:10:33.120Z",
        "updatedAt": "2025-11-28T06:43:44.269Z",
        "__v": 1
    }
}
```

#### Delete Courses

```http
DELETE /api/courses/{courseId}
```

| Parameter  | Type     | Description                          |
|:-----------|:---------|:-------------------------------------|
| `courseId` | `string` | **Required**. ID of course to Delete |

Response

```jsone 
{
    "message": "Course deleted successfully.",
    "course": {
        "_id": "692937f6d8eaa8a920c086cc",
        "title": "Java  Masterclass",
        "description": "Master the four pillars of OOP in Java.",
        "content": "Covers classes, objects, inheritance, polymorphism, abstraction, and interfaces.",
        "instructor": "6923c3dee5d3ed848a678ab9",
        "enrolledUsers": [
            "6923c13e39026780116786fa"
        ],
        "createdAt": "2025-11-28T05:49:42.596Z",
        "updatedAt": "2025-11-28T06:11:19.619Z",
        "__v": 1
    }
}
```

#### Ask AI (ChatGPT Integration)

```http
POST /api/ai/ask
```

| Parameter | Type     | Description                      |
|:----------|:---------|:---------------------------------|
| `query`   | `string` | **Required**. Question to ask AI |

```jsone 
{
  "query": "I want to learn Java. Suggest the best courses for me."
}
```

Response

```jsone 
{
    "success": true,
    "answer": "<b>Java OOP Masterclass</b>\n<p><b>Description:</b> Master the four pillars of OOP in Java.</p>\n<p><b>Content:</b> Covers classes, objects, inheritance, polymorphism, abstraction, and interfaces.</p>\n<p><b>Instructor:</b> Alice Perera</p>\n<hr>"
}
```

## Run Locally

#### Clone the project frontend

```bash
  git clone https://github.com/NavodyaDhanushka/Online_Learning_Platform_with_Chat_GPT_Integration_Frontend.git
```

Go to the project directory

```bash
  cd vite-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

#### Clone the project backend

```bash
  git clone https://github.com/NavodyaDhanushka/Online_Learning_Platform_with_Chat_GPT_Integration_Backend.git
```

Go to the project directory

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file for

#### Backend

`MONGO_URI`=

`JWT_SECRET`=

`OPENAI_API_KEY`=

`PORT`=

#### Frontend

`VITE_API_BASE_URL`=

## Deployment

Your application is successfully deployed on an AWS EC2 instance, making it accessible over the internet through its
public IP address. After configuring the server, installing required dependencies, and allowing the necessary inbound
ports in the EC2 security group, the app is now live and running at:

👉 http://3.1.204.225:3000

## Demo

[Demo](https://drive.google.com/drive/folders/165_WSWGV3IcZmMqA3-ztrWa3m-oEG_f-?usp=drive_link)

## Feedback

If you have any feedback, please reach out to us at navodyadhanushka01@gmail.com

