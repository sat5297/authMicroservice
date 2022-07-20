FROM node
WORKDIR '/app'
COPY package.json .
RUN npm install 
COPY . .
ENV PORT=7500
EXPOSE 7500
CMD ["npm","start"]