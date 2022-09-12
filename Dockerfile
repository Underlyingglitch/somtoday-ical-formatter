FROM node:16

WORKDIR /src/app

COPY . .

RUN npm install

ENV TZ Europe/Amsterdam
ENV ICAL_URL changeme
ENV RETURN_URL changeme

CMD ["node", "main"]