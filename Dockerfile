FROM node:latest

# install make and python to compile nodejs/sqlite3 on arch architecture
RUN apt-get update

ADD ./startup.sh /usr/src/pimix/startup.sh
RUN chmod +x /usr/src/pimix/startup.sh

WORKDIR /usr/src/pimix/pimix-pwa

ENTRYPOINT [ "/usr/src/pimix/startup.sh" ]