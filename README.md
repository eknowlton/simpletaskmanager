# simpletaskmanager

[![Tests badge](https://github.com/eknowlton/simpletaskmanager/actions/workflows/tests.yml/badge.svg?event=push)](https://github.com/eknowlton/simpletaskmanager/actions/workflows/tests.yml)

Simple task manager application designed for desktop. With a special feature LLM Agent that can create and plan tasks for your project, as you describe details down to the due dates and tags.

A laravel based server-side SPA for managing tasks with Inertia, Vite, TailwindCSS, ShadCN, and other fun frameworks.

This application is designed for desktop use, and won't function for mobile well. A seperate react native application for WebSPA and possibly Android/iOS is planned in the future.

## jobshop.works

Currently trying out running small applications on AWS Lightsail via Containers. Utilizing the free tier, although it isn't the speediest so far.

https://jobshop.works

## Goals

This project started out as a fun way to mess around and get to know Laravel 12 and Inertia a little better, and I have. Then I figured I would spin it up to be a little project template for a simple task manager application and maybe even host it for people to use freely.

- Keep it simple
- Simple task manager
- Fast and fun to use

Once I get a stable version of this and the API solid, I want to add a campanion repository with React Native DOM for a mobile web SPA that you can install on your phone for quick and easy mobile access.

## Why is there AI?

Well with all the new buzz around AI and how cool it actually is, I figured I would play around with creating my own contexted AI agent for simpletaskmanager. It's pretty simple as of now, it just outlines a project based on your suggestions. It might always become more well integrated into the app.

## Containers

- **simpletaskmanager/nginx**

  Serves PHP application.
- **simpletaskmanager/app**

  Runs PHP-FPM and serves PHP application to NGINX.

## Structure 

The application is split up into three modules.

- API,  `api/
- App, `app/`
- Shared, `shared`

To allow sharing of data models, etc. that can be shared between the API and the App 

## Running application locally

Running the application locally should be as simple as running `docker compose up`. Profiles are setup if you would like to use those too...

```sh
$ docker compose --profile local up
```

There is a "production" profile as well, but I wouldn't run these specific containers for a production. You would want to have these services somewhere, like the database for example, and you would want that to be hosted probably outside of the container service. I personally choose to use cloud versions of these services.


## Building, Tagging & Pushing Images

Images are hosted in AWS ECR for the ECS cluster. You can build, tag and push the images by running docker bake.

```sh
$ TAG=$(git rev-parse --short HEAD) docker buildx bake --push 
```

This will build and tag the images to the latest git commit short sha1 hash ( You may want to create a commit for each change/image to avoid caching, maybe 🤷). Then it should push the images up to ECR.

![image](https://github.com/user-attachments/assets/aec60f6b-eeb5-41d3-b40b-5ef1d6ff671f)

<img width="1554" height="869" alt="image" src="https://github.com/user-attachments/assets/4c792f82-6041-40c6-b7fb-0c0702e9a40c" />

