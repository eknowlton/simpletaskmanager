group "default" {
  targets = ["web", "app", "cli"]
}

variable "TAG" {
    default = "latest"
}

variable "ENV" {
  default = "prod"
}

target "web" {
  context = "./"
  dockerfile = "./docker/nginx.Dockerfile"
  tags = [
    "simpletaskmanager/web:${TAG}"
  ]
}

target "app" {
  context = "./"
  dockerfile = "./docker/app.Dockerfile"
  tags = [
    "simpletaskmanager/app:${TAG}"
  ]
}

target "cli" {
  context = "./"
  dockerfile = "./docker/cli.Dockerfile"
  tags = [
    "simpletaskmanager/app:${TAG}-cli"
  ]
  args = {
    ENV = "${ENV}"
  }
}
