---
login_redirect_here: false

form:

  fields:
    -
      name: username
      type: text
      id: username
      placeholder: "Choose a username"
      validate:
        required: true
        message: PLUGIN_LOGIN.USERNAME_NOT_VALID
        config-pattern@: system.username_regex

    -
      name: email
      type: email
      id: email
      placeholder: "Enter your email"
      validate:
        required: true
        message: PLUGIN_LOGIN.EMAIL_VALIDATION_MESSAGE

    -
      name: password1
      type: password
      id: password1
      label: Enter a password
      validate:
        required: true
        message: PLUGIN_LOGIN.PASSWORD_VALIDATION_MESSAGE
        config-pattern@: system.pwd_regex

    -
      name: password2
      type: password
      id: password2
      label: Enter the password again
      validate:
        required: true
        message: PLUGIN_LOGIN.PASSWORD_VALIDATION_MESSAGE
        config-pattern@: system.pwd_regex

  buttons:
      -
          type: submit
          value: Submit
      -
          type: reset
          value: Reset

  process:
      register_user: true
      message: "You are logged in"
---

# Register
