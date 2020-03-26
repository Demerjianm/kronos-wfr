FROM node:12

ARG NODE_ENV=test
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/kronos_wfr

RUN apt-get update && apt-get install -y procps vim
RUN yarn upgrade

COPY package.json yarn.lock ./

RUN set -ex; \
    if [ "$NODE_ENV" = "production" ]; then \
        yarn install --no-cache --frozen-lockfile --production; \
    elif [ "$NODE_ENV" = "test" ]; then \
        yarn install --no-cache --frozen-lockfile; \
    fi;

RUN sed 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/' /etc/ssl/openssl.cnf > /etc/ssl/openssl.cnf.changed \
	&& mv /etc/ssl/openssl.cnf.changed /etc/ssl/openssl.cnf
    
COPY . .

ENV HOST=0.0.0.0 PORT=4200

EXPOSE ${PORT}
CMD [ "yarn", "test" ]
