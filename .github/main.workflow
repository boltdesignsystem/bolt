workflow "Smoke Tests" {
  on = "push"
  resolves = ["Smoke Tests: Unit Tests (Jest)", "install", "Smoke Tests: Linting"]
}

action "install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "yarn"
  args = "install"
}

action "Smoke Tests: Linting" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["install"]
  runs = "yarn"
  args = "lint"
}

action "Smoke Tests: Unit Tests (Jest)" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["install"]
  runs = "yarn"
  args = "test"
}

workflow "Build & Deploy" {
  on = "push"
  resolves = ["deploy"]
}

action "build install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "yarn"
  args = "install"
}

action "build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["build install"]
  runs = "yarn"
  args = "build"
}

action "deploy" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["build"]
  runs = "echo"
  args = "I should deploy but I cannot because there are no env vars"
}
