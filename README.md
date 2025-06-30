# diedump.run

- **diedump.run/nginx**

  Serves PHP application.
- **diedump.run/app**

  Runs PHP-FPM and serves PHP application to NGINX.

## Running application locally
Running the application locally should be as simple as running ...

```sh
$ docker compose up
```

## Building, Tagging & Pushing Images

Images are hosted in AWS ECR for the ECS cluster. You can build, tag and push the images by running docker bake.

```sh
$ TAG=$(git rev-parse --short HEAD) docker buildx bake --push 
```

This will build and tag the images to the latest git commit short sha1 hash ( You may want to create a commit for each change/image to avoid caching, maybe 🤷). Then it should push the images up to ECR.
