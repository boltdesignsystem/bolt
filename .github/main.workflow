workflow "Smoke Tests" {
  on = "push"
  resolves = ["Smoke Tests: Unit Tests (Jest)", "install", "Smoke Tests: Linting"]
}

action "install" {
  uses = "docker://boltdesignsystem/bolt-docker:latest"
  runs = "yarn"
  args = "install"
}

action "Smoke Tests: Linting" {
  uses = "docker://boltdesignsystem/bolt-docker:latest"
  needs = ["install"]
  runs = "yarn"
  args = "lint"
}

action "Smoke Tests: Unit Tests (Jest)" {
  uses = "docker://boltdesignsystem/bolt-docker:latest"
  needs = ["install"]
  runs = "yarn"
  args = "test"
}

workflow "Build & Deploy" {
  on = "push"
  resolves = ["deploy"]
}

action "build install" {
  uses = "docker://boltdesignsystem/bolt-docker:latest"
  runs = "yarn"
  args = "install"
}

action "build" {
  uses = "docker://basaltinc/docker-node-php-base:latest"
  needs = ["build install"]
  runs = "yarn"
  args = "build"
}

action "deploy" {
  uses = "docker://basaltinc/docker-node-php-base:latest"
  needs = ["build"]
  runs = "echo"
  args = "I should deploy but I cannot because there are no env vars"
}
