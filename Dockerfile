FROM node:18
WORKDIR /app

### Local docker deployment ---
# # Copy package files
# COPY package*.json ./
# # Install dependencies
# RUN npm install
# # Copy source code
# COPY . .
# # Expose port
# EXPOSE 3000
# # Start development server
# CMD ["npm", "start"]

### GCLOUD optimized deployment ---
# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the React app for production
RUN npm run build

# Install serve to serve the built app
RUN npm install -g serve

# Expose port 8080 (required by Cloud Run)
EXPOSE 8080

# Serve the built app on port 8080
CMD ["serve", "-s", "build", "-l", "8080"]