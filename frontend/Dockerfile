#
# THIS DOCKER FILE BUILDS FRONT END IMAGE
#
FROM nginx:stable-alpine

# update container packages
RUN apk update && apk upgrade

# create destination directory
RUN mkdir -p /var/www

WORKDIR /var/www

# build asserts
COPY ./dist /var/www

# update file permissions
RUN chown -R nginx:nginx /var/www/*

# copy nginx config
COPY ./docker/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
