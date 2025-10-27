use es-modules
use jwt authentication for api requests
use typescript for all code
create a folder structure that separates api routes, middleware, models, and utilities
create .env file for environment variables
create readme.md with project setup instructions
include instructions for setting up JWT authentication in the readme.md
include how to use the API in postman.
include example .env file in the readme.md

use mongoose for mongodb interactions
dont use mongodb native driver
create schema for in the models folder
include error handling middleware in the middleware folder

use try catch for async functions and db operations
include comments in the code for clarity

create singleton database connection utility in the utilities folder `connectToDatabase.ts`

use connectToDatabase.ts in the api routes to connect to the database before handling requests
dont edit package.json
create separate files for functions that can be reused across multiple files

use morgan for request logging middleware
use validation for incoming request bodies in the routes in middleware functions and return all errors in list

---

## LMS API Structure

User schema has role: ["user", "admin"],
users when registered have default role "user"
admin can create courses, chapters, lessons and manage users.
user can enroll in courses and access content
unauthenticated users can login and see all courses but not access content

A Course has multiple Chapters
Each Chapter has multiple Lessons
Each Lesson can include video, image, description, and metadata (e.g., duration, resources, quiz links)

## Course

`{
  title: String,
  description: String,
  instructor: ObjectId (User),
  thumbnail: String,
  category: String,
  chapters: [ObjectId (Chapter)],
  createdAt, updatedAt
}
`
chapter:
`{
  title: String,
  course: ObjectId (Course),
  lessons: [ObjectId (Lesson)],
  order: Number
}
`

lesson:
`
{
title: String,
description: String,
videoLink: String,
imageLink: String,
resources: [String],
duration: Number,
chapter: ObjectId (Chapter),
order: Number
}

`
