#################################################################
# 1. BUILD STAGE – compile the Vite production assets           #
#################################################################
FROM node:24-alpine AS builder          
WORKDIR /app

# 1-a  copy dependency manifests first (cache layer)
COPY package*.json ./
RUN npm ci                               # installs from package-lock.json

# 1-b  copy the rest of the project and build
COPY . .
RUN npm run build        # outputs static site to  /app/dist


#################################################################
# 2. DEV STAGE – hot-reload server (`npm run dev`)              #
#################################################################
FROM node:24-alpine
WORKDIR /app

# 2-a  copy project source for live editing
COPY . .

# 2-b  copy node_modules from the builder stage (faster, no re-install)
COPY --from=builder /app/node_modules ./node_modules

# expose the dev port
EXPOSE 5173

# default command: vite dev server, accessible at host:5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]