# URL SHORTENER

The URL Shortener website allows a user to shorten URLs using the web interface and API endpoints.

The following end points have been implemented:
- ``/api/encode`` - Encodes a URL to a shortened URL.
- ``/api/decode`` - Decodes a shortened URL to its original URL.
- ``/api/statistic/{url_path}`` - Return basic stats of a short URL path.
- ``/api/list`` - List all available URLs.
- ``/{url_path}`` - This should redirect the user to the long url.

### 1. Tech stack

The following tech stack has been used to develop the application:
- Front End
  - VueJs
  - NuxtJs Framework
- Back End
  - NodeJs
  - ExpressJs Framework

### 2. Prerequisites

To build and run the application, the following software is required:
- node 16+
- docker 20+

### 3. Building the front end
Follow the steps below to build the front end:
- From project root, navigate to the frontend directory ``cd frontend``
- Create the .env file by copying and editing .env.example as per your requirement `` cp .env.example .env``
- Install node dependencies ``npm install``
- Build the application ``npm run build``
- Generate deployment assets ``npm run generate``

### 4. Building the back end
Follow the steps below to build the back end:
- From project root, navigate to the backend directory ``cd backend``
- Create the .env file by copying and editing .env.example as per your requirement `` cp .env.example .env``
- Install node dependencies ``npm install``

### 5. Using docker-compose to run the application
- ``docker-compose build`` - build docker images
- ``docker-compose up`` - run docker containers in foreground