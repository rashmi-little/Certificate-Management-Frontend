import {expect, test, vi } from "vitest";
import ForgotPassword from "../../pages/sign-in/components/ForgotPassword"
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import userEvent from "@testing-library/user-event";

const handleClose = vi.fn();

const renderForgotPassword = () => {
    return (
        render(
            <Provider store={store}>
                <ForgotPassword open={true} handleClose={handleClose}/>
            </Provider>
        )
    )
}

describe("ForgotPassword", () => {

    test("renders properly", () => {
        renderForgotPassword();
        const resetPasswordTextElement = screen.getByText(/Reset password/i);
        expect(resetPasswordTextElement).toBeInTheDocument();
        const enterEmailTextElement = screen.getByText("Enter your account's email address,", {exact: false});
        expect(enterEmailTextElement).toBeInTheDocument();
        const inputElement = screen.getByPlaceholderText("Email address");
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveFocus();
        const cancelButton = screen.getByRole("button", {name: "Cancel"});
        expect(cancelButton).toBeInTheDocument();
        const submitButton = screen.getByRole("button", {name: "Submit"});
        expect(submitButton).toBeInTheDocument();
    })

    test("show email required error message", async () => {
        userEvent.setup();
        renderForgotPassword();
        const submitButton = screen.getByRole("button", {name: "Submit"});
        await userEvent.click(submitButton);
        const emailRequiredError = await screen.findByText("Please enter your email");
        expect(emailRequiredError).toBeInTheDocument();
    })

    test("show error message when invalid email entered", async () => {
        userEvent.setup();
        renderForgotPassword();
        const inputElement = screen.getByPlaceholderText("Email address");
        await userEvent.type(inputElement, "siva@");
        const submitButton = screen.getByRole("button", {name: "Submit"});
        await userEvent.click(submitButton);
        const invalidEmailError = await screen.findByText("Invalid email !");
        expect(invalidEmailError).toBeInTheDocument();
    })

    test("close the modal after submit", async () => {
        userEvent.setup();
        renderForgotPassword();
        const cancelButton = screen.getByRole("button", {name: "Cancel"});
        await userEvent.click(cancelButton);

        expect(handleClose).toHaveBeenCalledTimes(1);
    })

})