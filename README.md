# simpletaskmanager
Simple task manager application designed for desktop. With a special feature LLM Agent that can create and plan tasks for your project, as you describe details down to the due dates and tags.

A laravel based server-side SPA for managing tasks with Inertia, Vite, TailwindCSS, ShadCN, and other fun frameworks.

This application is designed for desktop use, and won't function for mobile well. A seperate react native application for WebSPA and possibly Android/iOS is planned in the future.

## jobshop.works

Currently trying out running small applications on AWS Lightsail via Containers. Utilizing the free tier, although it isn't the speediest so far.

https://jobshop.works

## Containers

- **simpletaskmanager/nginx**

  Serves PHP application.
- **simpletaskmanager/app**

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

![image](https://github.com/user-attachments/assets/aec60f6b-eeb5-41d3-b40b-5ef1d6ff671f)

<img width="1554" height="869" alt="image" src="https://github.com/user-attachments/assets/4c792f82-6041-40c6-b7fb-0c0702e9a40c" />

