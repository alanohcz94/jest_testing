import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";
import React from "react";

describe("Testing UserForm Component", () => {
  it("shows two inputs and a button", async () => {
    // render component
    render(<UserForm />);
    // Manipulate the component or find an element in it
    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");
    // Assertion - make sure the component is doing
    // what we expect it to do
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
  });

  test("it calls onAddUser when the form is submitted", async () => {
    // try to render component
    const mock = jest.fn();
    render(<UserForm onAddUser={mock} />);
    // find the two inputs
    const nameInput = screen.getByRole("textbox", { name: /Name/i });
    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    // simulate typing in a name
    await user.type(nameInput, "Kim");
    // simulate typing in a email
    await user.type(emailInput, "kim@mail.com");
    //find button
    const button = screen.getByRole("button", { name: /Add User/i });
    // simulate button clicking
    await user.click(button);
    // Asset to make sure 'OnAddUSer' gets called with email and name
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ name: "Kim", email: "kim@mail.com" });
  });

  test('Once submited input should be emptied', async () => {
    // render
    render(<UserForm onAddUser={() => {}} />);
    
    // Get UI
    const nameInput = screen.getByRole("textbox", {name: /name/i});
    const emailInput = screen.getByRole("textbox", {name: /email/i});
    const button = screen.getByRole('button', {name: /add user/i});

    // Action of UI
    await user.type(nameInput, 'Kim');
    await user.type(emailInput, 'Kim@mail.com');
    await user.click(button);

    // Assert
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  })
});
