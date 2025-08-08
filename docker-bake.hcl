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
    "932061877711.dkr.ecr.us-east-1.amazonaws.com/simpletaskmanager/php:${TAG}"
  ]
}

target "web" {
  context = "./"
  dockerfile = "./docker/nginx.Dockerfile"
  tags = [
    "932061877711.dkr.ecr.us-east-1.amazonaws.com/simpletaskmanager/web:${TAG}"
  ]
}

target "app" {
  context = "./"
  dockerfile = "./docker/app.Dockerfile"
  tags = [
    "932061877711.dkr.ecr.us-east-1.amazonaws.com/simpletaskmanager/app:${TAG}"
  ]
}
