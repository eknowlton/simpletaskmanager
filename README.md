# simpletaskmanager
Simple task manager application designed for desktop. With a special feature LLM Agent that can create and plan tasks for your project, as you describe details down to the due dates and tags.

A laravel based server-side SPA for managing tasks with Inertia, Vite, TailwindCSS, ShadCN, and other fun frameworks.

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

![image](https://github.com/user-attachments/assets/23e1c959-41e8-4b12-911d-35b9b76919b2)

![image](https://github.com/user-attachments/assets/b29cbe64-49a5-4a92-8c9a-52c86bfe2cd8)

![image](https://github.com/user-attachments/assets/a31bb09c-4a86-418b-8add-192b342bc75c)

![image](https://github.com/user-attachments/assets/1a4c5148-db18-4f10-9f3e-056f1a626a2e)
