# 🎓 BeGoodAt (Backend)

**BeGoodAt** is a focused learning management API designed to help developers map out their path to mastery. Instead of getting lost in a sea of tutorials, this tool allows you to structure skills into actionable course checklists, ensuring you always know what’s next on your plate.

This project serves as my personal project for experiencing the world of **NoSQL** and **GraphQL**.

---

## 🛠 Tech Stack

This project was my first deep dive into the following technologies:

- **Framework:** [NestJS](https://nestjs.com/) (Progressive Node.js framework)
- **Database:** [MongoDB](https://www.mongodb.com/) (NoSQL via [TypeORM](https://typeorm.io/))
- **API Layer:** [GraphQL](https://graphql.org/) (Apollo Server)
- **Language:** TypeScript

---

## 🏗 Features & Schema

The backend exposes a GraphQL playground where you can:

- **Query** your current learning progress and skill sets.
- **Mutate** (Add/Update) skills and their nested courses.

### Example Query

```graphql
query GetAllMySkills {
  skills {
    name
    description
    startDate
    completionDate
    courses {
      name
      startDate
      completionDate
    }
  }
}
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB

### Installation

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/wlslai/begoodat-backend.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up your environment variables:**
    Create a `.env` file in the root directory:
    ```env
    MONGO_URI=mongodb://localhost:27017/begoodat
    PORT=3000
    ```
4.  **Run the application:**
    ```bash
    npm run start:dev
    ```
5.  **Explore the API:**
    Open the GraphQL Playground at `http://localhost:3000/graphql`.

### MongoDB Installation

Choose one of the following MongoDB installation methods and follow the instructions.

#### Docker (recommended)

1.  **Install Docker for your operating system (if not installed previously)**
    - [Install Docker Desktop on Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)
    - [Install Docker Desktop on macOS](https://hub.docker.com/editions/community/docker-ce-desktop-mac/)
    - [Install Docker Desktop on Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

2.  **Open up a Terminal session and run:**

    ```bash
      docker run --name mongo -p 27017:27017 -d mongo
    ```

    MongoDB should be running after starting the container.

#### Windows (non-Docker)

[Windows Installation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

#### MacOS

[MacOS Installation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

#### Linux

[Linux Installation](https://docs.mongodb.com/manual/administration/install-on-linux/)

### MongoDB Connection Configuration

For dev environment, duplicate the `.env.example` file and remove the `.example` extension. You may put the connection details like database url in the `.env` file.

For production, consider using a secret manager or passing as environment variable when starting the application. Avoid putting sensitive information in the `.env` file.

---

## 📝 Future Considerations

- [ ] Implement JWT Authentication for personal user accounts.
- [ ] Add "Time-to-Mastery" estimates for each skill based on course length.
- [ ] Add "Delete" and "Filter" features.
