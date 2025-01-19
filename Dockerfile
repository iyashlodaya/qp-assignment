# Step 1: Use the official Node.js image.
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /qp-assignment

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install all dependencies (including dev dependencies like TypeScript)
RUN npm install

# Step 5: Copy the entire application into the container
COPY . .

# Step 6: Build the TypeScript files
RUN npm run build

# Step 7: Expose the port the app will run on
EXPOSE 3000

# Step 8: Run the app (starting from the built JavaScript files)
CMD ["npm", "start"]
