group "default" {
  targets = ["web", "app"]
}

variable "TAG" {
    default = "latest"
}

variable "ENV" {
  default = "prod"
}

target "php" {
  context = "./"
  dockerfile = "./docker/php.Dockerfile"
  tags = [
    "simpletaskmanager/php:${TAG}"
  ]
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
  ARGS = {
    ENV = "${ENV}"
  }
}
