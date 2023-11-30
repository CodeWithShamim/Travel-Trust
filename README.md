# TRAVEL TRUST

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/website-up-down-green-red/https/travel-trust-codewithshamim.vercel.app.svg)](https://travel-trust-codewithshamim.vercel.app/)

[**API DOCUMENTATION**](https://documenter.getpostman.com/view/22498570/2s9YeHZqod)

## Overview

This repository contains the source code and assets for the Travel Trust website. A travel agency service website simplifies travel planning with streamlined bookings for flights, accommodations, and tours,
ensuring a hassle-free and enjoyable experience for users. The website is built with the following technologies:

<div>
<a href="https://travel-trust-codewithshamim.vercel.app/" target="_blank"><img src="https://res.cloudinary.com/djdrjwmfc/image/upload/v1701278495/1_htlvf2.png" alt="Alt Text" width="100%"></a>

<a href="https://travel-trust-codewithshamim.vercel.app/" target="_blank"><img src="https://res.cloudinary.com/djdrjwmfc/image/upload/v1701278497/2_mkpshm.png" alt="Alt Text" width="30%"></a>
<a href="https://travel-trust-codewithshamim.vercel.app/" target="_blank"><img src="https://res.cloudinary.com/djdrjwmfc/image/upload/v1701278496/3_p9jqrc.png" alt="Alt Text" width="30%"></a>
<a href="https://travel-trust-codewithshamim.vercel.app/" target="_blank"><img src="https://res.cloudinary.com/djdrjwmfc/image/upload/v1701278495/4_pulhjw.png" alt="Alt Text" width="30%"></a>

</div>

### Technologies used

| Technology    | Description                                         |
| ------------- | --------------------------------------------------- |
| TypeScript    | Typed superset of JavaScript                        |
| Next.js       | React framework for building web applications       |
| Redux Toolkit | State management library for React                  |
| RTK Query     | Data fetching and caching library for Redux Toolkit |
| TailwindCSS   | Utility-first CSS framework                         |
| AntDesign     | Design system for enterprise-level applications     |
| Node.js       | JavaScript runtime for server-side development      |
| Express.js    | Web application framework for Node.js               |
| Prisma        | Database toolkit for Node.js and TypeScript         |
| PostgreSQL    | Relational database for storing and retrieving data |

## Features

- **Interactive User Interface:**

  - User-friendly interface that allows users to navigate the website easily and find information.

- **Booking and Reservation System:**

  - An integrated system that enables users to book flights, hotels, and other services.

- **User Reviews and Ratings:**
  - A section where users can share their experiences, reviews, and ratings about the service.

## Getting Started

### Prerequisites

Make sure you have the following software installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- yarn: [Install here](https://classic.yarnpkg.com/lang/en/docs/install)
- PostgreSQL: [Download PostgreSQL](https://www.postgresql.org/download/)

### Installation

0. **Clone the repository:**

   ```bash
   git clone https://github.com/CodeWithShamim/Travel-Trust
   ```

## For FronEnd

1. **Navigate to the project directory:**

   ```bash
   cd travel-trust-frontend
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Create a `.env` file in the root of the project with the following content:**

   ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
    NEXT_PUBLIC_CLOUD_NAME=
    NEXT_PUBLIC_UPLOAD_RRESET=
    NEXT_PUBLIC_API_KEY=
    NEXT_PUBLIC_API_SECRET=

    NEXT_PUBLIC_GOOGLE_MAP_API_KEY=
    NEXT_PUBLIC_YT_VIDEO_URL=https://youtu.be/QoaDkejcHSc?si=oY8K_NZD5sYdNWKr
   ```

   Contact for this `env` file.

4. **Start the development server:**

   ```bash
   yarn dev
   ```

**Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the website locally.**

## For Backend

1. **Navigate to the project directory:**

   ```bash
   cd travel-trust-backend
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Create a `.env` file in the root of the project with the following content:**

   ```env
    NODE_ENV=development
    PORT=5000
    bycrypt_salt_rounds=12
    DATABASE_URL=
    JWT_SECRET=
    JWT_REFRESH_SECRET=
    JWT_EXPIRES_IN=
    JWT_REFRESH_EXPIRES_IN=
   ```

   Contact for this `env` file.

4. **Run Prisma migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**

   ```bash
   yarn dev
   ```

**Open your browser and go to [http://localhost:5000](http://localhost:3000) to view the backend url.**

## Contributing

We welcome contributions! To contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and submit a pull request.

Please read our [Contribution Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out:

- Email: shamimislamonline@gmail.com
- LinkedIn: [@codewithshamim](https://www.linkedin.com/in/codewithshamim/)
