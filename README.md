**eventapi** is a simple api endpoint for [event app](https://github.com/rifanid98/event) Todo Event Application built with Node.js, Express Js as a framework of Node.js and MySQL as a database which has [features](#features) such as simple CRUD (GET & POST only).

## :memo: Table Of Content

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Features](#features)
-   [Examples](#examples)
-   [Built wtih](#features)
-   [Author](#author)
-   [License](#license)

## Prerequisites

-   NPM or Yarn as package manager.
-   Node.js installed on the local machine.
-   MySQL intalled on the local machine (ex. XAMPP)

## Installation

1. Clone this repository:
   `git clone https://github.com/rifanid98/eventapi`
2. Start XAMPP
3. Database configuration:
    - Open http://localhost/phpmyadmin in the browser
    - Import database, select `event.sql` file from project folder
4. Start the server:
    - Open root project folder with command line (terminal, linux. cmd, windows. etc.)
    - Type and run this command `npm start` to start the server.
    - Make sure there are no other processes that use port 3000
5. Run app with api testing tools like postman, etc. on http://localhost:3000/event/api/v1/ or using local ip like http://192.168
   43.88:3000/talkwe/api/v1/ as an example.

## Features

-   [x] GET & POST
-   [x] Search, Pagination
-   [x] CORS allowed

## Examples

[How to use](https://github.com/rifanid98/eventapi/blob/master/examples.md)

## Built with

-   [Node.js](http://nodejs.event/) - JavaScript runtime environment
-   [Express.js](https://expressjs.com/) - Node.js framework
-   [MySQL](https://www.mysql.com/) Database

## Author

-   [Adnin Rifandi Sutanto Putra](https://event.linkedin.com/in/adnin-rifandi/)

## License

This project is licensed under the MIT License - see event [LICENSE](https://github.com/event/eventapi/blob/master/LICENSE) file for details
