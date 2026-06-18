# GeoWellHub

GeoWell Hub will be a web application that helps users discover wellness retreats, mineral water resorts, thermal resorts, spas, and health-focused hotels throughout the Republic of Georgia. Georgia is internationally known for its mineral water destinations, thermal springs, mountain resorts, and wellness tourism opportunities.

====

Challenges Encountered

Community listings were not loading.
Community listings were not appearing in Explorer.
Community listings were not appearing in Manage Listings.
Details page for community listings returned Cannot GET /api/community-listings/:id.
Edit functionality originally tried to reuse the Create form, which caused design and usability issues.
Thunder Client was used to test CRUD routes before connecting frontend functionality.

1. Edit Form Functionality

One of the main challenges during development was implementing the Edit functionality on the Manage Listings page.

Initially, clicking the Edit button populated the top "Create Retreat" form instead of editing the selected listing. This created confusion because users could accidentally create duplicate records instead of updating existing ones.

To solve this issue, a separate edit form was added inside each listing card. This allowed users to edit a specific listing directly from its own card while keeping the Create form dedicated to creating new records.

2. Community Listings Not Loading

Another challenge occurred after replacing the Reviews collection with the Community Listings collection.

Community listings were successfully stored in MongoDB but were not displaying on the Explorer page or Manage Listings page.

The issue was traced to missing frontend rendering logic and missing API integration. Additional functions were added to load, display, edit, and delete community listings.

3. Community Listing Details Route

The Details page originally only supported Retreat records.

When a user clicked "View Details" on a Community Listing, the application returned a "Cannot GET" error because a GET by ID route for community listings had not yet been implemented.

To solve this issue:

- A GET /api/community-listings/:id route was added.
- A database function was created to retrieve a single community listing by MongoDB ID.
- The Details page was updated to support both Retreats and Community Listings.

4. Managing Multiple Collections

The application uses two MongoDB collections:

- retreats
- communityListings

Managing two separate collections while maintaining consistent CRUD functionality required additional planning and testing.

Special attention was required to ensure that Explorer, Details, and Manage pages correctly handled both collections.

5. API Testing

Before connecting the frontend, all routes were tested using Thunder Client.

Testing API routes independently helped identify backend issues early and made frontend integration easier.

All CRUD routes were verified through Thunder Client before implementing the user interface.

Tools Used for Testing

- Thunder Client
- MongoDB Compass
- Browser Developer Tools
- MongoDB Native Driver
- Express.js
- # Node.js

Future Improvements

1. User Authentication

Add secure user authentication and account management.

Users would be able to:

- Register for an account
- Sign in
- Sign out
- Manage their profile

Authentication would help protect user-generated content and improve platform security.

2. User Reviews

Add a dedicated Reviews feature.

Authenticated users would be able to:

- Create reviews
- Edit their own reviews
- Delete their own reviews
- Rate wellness destinations

This feature was originally considered during project planning and may be implemented in a future version.

3. Separate User Portals

Create separate experiences for different user types.

Community Members

- Submit local mineral springs
- Submit wellness destinations
- Contribute community information

Business Owners

- Create official retreat listings
- Manage spa listings
- Manage resort listings
- Update business information

These features would be supported through separate account types and permissions.

4. Dedicated Listing Creation Pages

Currently, retreat listings and community listings are managed from the same page.

A future version would separate them into:

- Community Listing Submission Page
- Retreat Owner Dashboard

This would create a more user-friendly experience and better support future authentication features.

5. Image Upload Support

Currently users provide image URLs.

A future version would allow:

- Direct image uploads
- Multiple photos per listing
- Photo galleries

6. Advanced Search and Filtering

Future enhancements could include:

- Search by region
- Search by wellness need
- Search by treatment type
- Search by rating
- Interactive filtering

7. Interactive Map Integration

Display wellness destinations on an interactive map of Georgia.

Users could discover nearby:

- Mineral water resorts
- Thermal spas
- Wellness hotels
- Community wellness destinations

8. Mobile Application

Develop a mobile version of GeoWell Hub for travelers who wish to access wellness information while visiting Georgia.

9. Wellness Destination Verification

Allow administrators to verify business listings and community submissions to improve data quality and reliability.

10. Personalized Recommendations

# Provide wellness destination recommendations based on user interests, wellness goals, and previous searches.

========================================

Project Progress Notes

Backend functionality completed and tested.

Completed Features

Backend

- Node.js + Express server
- MongoDB Native Driver
- ES Modules (import/export)
- REST API architecture
- No Mongoose used
- No template engines used

MongoDB Collections

1. retreats

- Create Retreat
- Read All Retreats
- Read Retreat By ID
- Update Retreat
- Delete Retreat

2. communityListings

- Create Community Listing
- Read All Community Listings
- Read Community Listing By ID
- Update Community Listing
- Delete Community Listing

Frontend Pages

Home Page

- http://localhost:3000

Explorer Page

- http://localhost:3000/explorer.html

Manage Listings Page

- http://localhost:3000/manage.html

Details Page

- http://localhost:3000/details.html?id=RECORD_ID

Explorer Features

- Displays Retreat listings
- Displays Community listings
- Search functionality
- Filter functionality
- View Details buttons
- Client-side rendering using Vanilla JavaScript

Manage Listings Features

Retreat Management

- Create Retreat
- Edit Retreat
- Delete Retreat
- View Existing Retreats

Community Listing Management

- Create Community Listing
- Edit Community Listing
- Delete Community Listing
- View Existing Community Listings

Details Page

- Loads Retreat details by ID
- Loads Community Listing details by ID
- Displays descriptions
- Displays traditional benefits
- Displays wellness information

API Routes Tested

Retreat Routes

GET
/api/retreats

GET BY ID
/api/retreats/:id

POST
/api/retreats

PUT
/api/retreats/:id

DELETE
/api/retreats/:id

Community Listing Routes

GET
/api/community-listings

GET BY ID
/api/community-listings/:id

POST
/api/community-listings

PUT
/api/community-listings/:id

DELETE
/api/community-listings/:id

Testing Completed

Thunder Client

- All Retreat routes tested successfully
- All Community Listing routes tested successfully

Browser Testing

- Explorer page works
- Details page works
- Manage page works
- Create works
- Update works
- Delete works
- Search works

Functionality Phase Completem ---done
------------ Day 6th ------
Next Phase
Frontend Design and Styling

Remaining Tasks

UI / Design

- Navigation Bar
- Bootstrap Cards
- Hero Section
- Responsive Layout
- Real Borjomi images
- Real Ureki images
- Real Tskaltubo images
- Real Abastumani images
- Real Sairme images
- CSS module organization

Project Requirements Remaining

- Generate 1000+ records using Mockaroo
- README
- Screenshots
- Deployment
- Narrated Demo Video
- Run Prettier
- Run ESLint
- Final GitHub Push

Future Improvements

- User authentication
- User accounts
- Separate portal for Retreat Owners
- Separate portal for Community Members
- User-submitted reviews
- Review moderation
- User profile management

=============================

Remaining Work
UI / Design
High Priority
Navigation Bar
Bootstrap Cards
Hero Section
Responsive Layout
Better spacing
Better typography
Images

Need real images for:

Borjomi
Ureki
Tskaltubo
Abastumani
Sairme

Data
Mockaroo

Required:

1000+ records

=== README ====

Author
Class Link
Project Objective
Screenshot
Instructions
Deployment URL
MIT License -- done

== to be run ==
npm run lint

npx prettier . --write
