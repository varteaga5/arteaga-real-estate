import React, { useState } from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";

// this component receives onLogin from Login.js, which receives it from App.js
function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [wants, setWants] = useState("");
  // helper state for functionality of the errors to display
  const [inputErrors, setInputErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // onSubmit function that handles the submission of form by making a post request
  function handleSubmit(e) {
    e.preventDefault();
    setInputErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        wants,
      }),
    }).then((r) => {
      // sets isLoading to false so the correct text renders in the button
      // if there was an input error, the error messages will be set into state
      setIsLoading(false);
      console.log("this is r", r);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setInputErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password Confirmation</Label>
        <Input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="wants">My ideal home has...</Label>
        <Textarea
          rows="3"
          id="wants"
          value={wants}
          onChange={(e) => setWants(e.target.value)}
        />
      </FormField>
      <FormField>
        <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
      </FormField>
      <FormField>
        {inputErrors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default SignUpForm;
