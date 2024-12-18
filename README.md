# BruinDen

Jump To: [Overview](#Overview) | [Installation & Running](#Installation) | [Testing](#Testing-Overview)  


# Overview  
  

### Project Members & Git ID
- [Kelsey Shan](https://github.com/kshan813)
- [Zhanhao Cao](https://github.com/LaziestCactus)
- [Jayden Truong](https://github.com/jaydent4)
- [Maddox Yu](https://github.com/maddoxyu)
- [Corey Shen](https://github.com/corey-shen)
- [Richard Chen](https://github.com/chenr4731)

BruinDen is a UCLA-specific platform created to streamline the off-campus housing search by connecting UCLA students who need to sublease or find housing for upcoming academic terms. By exclusively targeting Bruins, BruinDen provides a secure, user-friendly environment that simplifies the complexities of apartment hunting, roommate matching, and lease transfers, making it easier for UCLA students to find affordable, college-budget-friendly housing.

### Platform Details:
Platform: Web-based application

### Tech Stack:
Frontend: React, Tailwind  
Backend: Node.js  
Map Integration: Google Maps API for real-time mapping of apartment locations  
Image Processing: Cloudinary API  
User Authentication: Email checking system to ensure log in access to the platform given only to verified students who sign up  


### Project Proposal:
https://docs.google.com/document/d/1Gxc4xvDvL-ncSKKCWR_ej-Vv0OBaiP21iwYS9AsvrZs/edit?usp=sharing 

### Feature Description:
- User Authentication
- Creating an Apartment Listing
- Post on Message Board
- Search Functionality with a Filter and Search Bar
- Add Listings to a Favorites List
- Open up Detailed Listing Pages
- Updating User Profile

# Installation

Clone the git repo using:

```bash
git clone https://github.com/LaziestCactus/BruinDen.git
```

Install the necesary dependencies for the project :
```bash
npm install
```
You can view the package.json file to see what dependencies were installed.

### Database Set Up
Use the .env in our Code Repo Document submitted on gradescope to view the apartment listings and posts we've already added to the database for testing. You should have something for these in the .env:
- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
- DATABASE_URL
- NEXTAUTH_SECRET
- JWT_SECRET
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_UPLOAD_PRESET
- CLOUDINARY_API_SECRET

### Running the Project
Navigate to the project directory:
```
cd bruinden
```
Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project.

# Testing Overview

Attached in GradeScope Submission via Google Doc.
