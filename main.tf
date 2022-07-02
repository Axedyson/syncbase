terraform {
  required_version = "~> 1.2.3"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.21.0"
    }
  }
}

data "digitalocean_ssh_keys" "keys" {}

resource "digitalocean_droplet" "server" {
  image      = "dokku-20-04"
  name       = "server-1"
  region     = "nyc3"
  size       = "s-1vcpu-1gb"
  monitoring = true
  ipv6       = true
  ssh_keys   = data.digitalocean_ssh_keys.keys.ssh_keys[*].id
  connection {
    host    = self.ipv4_address
    agent   = true
    timeout = "2m"
  }
  provisioner "remote-exec" {
    inline = [
      "sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres",
      "sudo dokku plugin:install https://github.com/dokku/dokku-redis.git redis",
      "dokku postgres:create syncbase_postgres",
      "dokku redis:create syncbase_redis",
      "dokku apps:list"
    ]
  }
}
