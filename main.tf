terraform {
  required_version = "~> 1.2.7"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.22.1"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.8.0"
    }
  }

  cloud {
    organization = "syncbase"

    workspaces {
      name = "syncbase"
    }
  }
}

data "digitalocean_ssh_keys" "keys" {}

variable "SESSION_SECRET" {
  sensitive = true
}

resource "digitalocean_droplet" "server" {
  image      = "ubuntu-22-04-x64"
  name       = "syncbase-api"
  region     = "nyc3"
  size       = "s-1vcpu-1gb"
  monitoring = true
  ipv6       = true
  ssh_keys   = data.digitalocean_ssh_keys.keys.ssh_keys[*].id
  user_data  = <<-EOT
    #!/bin/bash

    wget https://raw.githubusercontent.com/dokku/dokku/v0.28.0/bootstrap.sh
    sudo DOKKU_NO_INSTALL_RECOMMENDS=" --no-install-recommends " DOKKU_TAG=v0.28.0 bash bootstrap.sh

    dokku apps:create server
    dokku config:set server SESSION_SECRET=${var.SESSION_SECRET}

    sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
    sudo dokku plugin:install https://github.com/dokku/dokku-redis.git redis

    dokku postgres:create syncbase_postgres
    dokku redis:create syncbase_redis

    dokku postgres:link syncbase_postgres server
    dokku redis:link syncbase_redis server

    dokku git:from-image server ghcr.io/axedyson/syncbase-server:latest

    cat << EOF > /etc/nginx/sites-available/default
    server {
      listen      80 default_server;
      listen [::]:80 default_server;
      server_name _;
      return      444;
    }
    EOF

    dokku domains:set server api.syncbase.tv
    dokku proxy:ports-set server http:80:8080

    sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
    dokku config:set --global DOKKU_LETSENCRYPT_EMAIL=andersalting@gmail.com

    dokku letsencrypt:enable server
    dokku letsencrypt:cron-job --add
  EOT
  connection {
    host = self.ipv4_address
  }
  provisioner "remote-exec" {
    inline = [
      "cloud-init status --wait"
    ]
  }
}

output "ipv4_address" {
  value = digitalocean_droplet.server.ipv4_address
}

resource "vercel_project" "frontend" {
  name      = "syncbase-frontend"
  framework = "nextjs"
}

resource "vercel_project_domain" "default" {
  project_id = vercel_project.frontend.id
  domain     = "syncbase.tv"
}

resource "vercel_dns_record" "a" {
  domain = vercel_project_domain.default.domain
  name   = "api"
  type   = "A"
  value  = digitalocean_droplet.server.ipv4_address
}

data "vercel_project_directory" "web_folder" {
  path = "packages/web"
}

data "vercel_file" "yarn_lock" {
  path = "yarn.lock"
}

resource "vercel_deployment" "frontend_server" {
  project_id  = vercel_project.frontend.id
  files       = merge(data.vercel_project_directory.web_folder.files, data.vercel_file.yarn_lock.file)
  path_prefix = data.vercel_project_directory.web_folder.path
  production  = true
  environment = {
    NEXT_PUBLIC_SERVER_URL = "https://api.syncbase.tv/graphql"
  }
  depends_on = [
    digitalocean_droplet.server
  ]
}
