## Running the Next.js Frontend

To get the Next.js frontend up and running, follow these steps:

1. **Set Up the Backend**:
   - For backend setup, refer to the [docker-kingdom repository](https://github.com/hakimamarullah/docker-kingdom). This guide covers running the backend using Minikube and Kubernetes or using Docker Compose.

2. **Install Dependencies**:
   - Make sure to install the necessary dependencies by running:

     ```bash
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root of the frontend project directory.
   - Add any required environment variables. Check the `.env.example` file or documentation for the required variables.

4. **Start the Frontend**:
   - Run the following command to start the Next.js development server:

     ```bash
     npm run dev
     ```

   This will launch the frontend on `http://localhost:3000` by default.

If you have any questions or run into issues, feel free to reach out for support!
