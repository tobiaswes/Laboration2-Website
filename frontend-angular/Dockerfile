# Stage 1: Build the Angular app
FROM node:20.17.0 AS build
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the Angular app using Node.js Express
FROM node:20.17.0
WORKDIR /app

# Copy the build output from Stage 1
COPY --from=build /app/dist/frontend-ang-app/browser ./dist

# Install the `serve` package to serve the app
RUN npm install -g serve

# Serve the static files from the dist directory
CMD ["serve", "-s", "dist"]
EXPOSE 3000
