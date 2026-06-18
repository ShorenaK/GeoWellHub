# GeoWell Hub

## Project Description

GeoWell Hub is a full-stack wellness tourism web application designed to help users discover wellness destinations throughout Georgia.

The platform allows users to browse official wellness retreats and community-submitted wellness locations, search destinations by wellness needs, view detailed destination information, and manage listings through a complete CRUD interface.

The website consists of four pages:

- Home Page
- Explorer Page
- Details Page
- Manage Listings Page

Visitors can explore mineral water resorts, thermal spas, mountain wellness destinations, and community-submitted wellness locations while learning about traditional wellness benefits and treatments.

---

## Live Application

### Website

[GeoWell Hub](DEPLOYMENT_LINK_HERE)

### GitHub Repository

[GitHub Repository](GITHUB_REPOSITORY_LINK_HERE)

---

## Website Preview

### Home Page

![Home Page Screenshot](./frontend/images/home.png)

### Explorer Page

![Explorer Page Screenshot](./frontend/images/explorer.png)

### Details Page

![Details Page Screenshot](./frontend/images/details.png)

### Manage Listings Page

![Manage Listings Screenshot](./frontend/images/manage.png)

![Manage Listings Screenshot](./frontend/images/manage1.png)

---

## Technologies Used

### Front-End

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Bootstrap 5

### Back-End

- Node.js
- Express.js

### Database

- MongoDB (Docker Container)

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Docker
- MongoDB Compass
- Thunder Client
- ESLint
- Prettier
- npm

---

## Features

### Wellness Destination Explorer

- Browse official wellness retreats
- Browse community wellness listings
- Search by wellness needs
- View destination details

### Listing Management

- Create retreat listings
- Create community listings
- Edit listings
- Delete listings
- Manage wellness destinations

### Destination Details

- View destination images
- View descriptions
- View traditional wellness benefits
- View ratings
- View wellness needs

---

## Large Dataset Requirement

To satisfy the project requirement for large datasets, a dataset containing more than 1000 records was generated using Mockaroo.

The generated records were:

- Exported into `MOCK_DATA.json`
- Inserted using `seedLargeDataset.js`
- Imported into MongoDB
- Successfully tested through the application

The large dataset was retained for testing and validation purposes.

For deployment, a smaller production dataset was used to provide a better user experience and improve application performance.

---

## Validation & Code Quality

The project was validated using ESLint and formatted using Prettier.

### ESLint

```bash
npx eslint .
```