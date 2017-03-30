FROM alpine:3.3
MAINTAINER Tobias Gesellchen <tobias@gesellix.de> (@gesellix)

RUN apk add --update curl nodejs && rm -rf /var/cache/apk/*

WORKDIR /river
COPY ./package.json /river/package.json
RUN npm install

COPY ./mapper/drop_design_docs.js /river/drop_design_docs.js

ENTRYPOINT ["npm", "run"]
CMD ["sync", "--", "--mapper=drop_design_docs.js", "--end_on_catchup=true"]
#CMD ["load", "--", "--mapper=drop_design_docs.js"]
