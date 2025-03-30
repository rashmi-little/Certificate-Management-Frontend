import {expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import userEvent from "@testing-library/user-event";
import ForgotPassword from "../../pages/ForgotPassword";

vi.mock("@mui/material", async () => {
    const actualMaterial = await vi.importActual('@mui/material');
    
    return {
      ...actualMaterial,     
      useMediaQuery: vi.fn(),
    };
  });

const renderForgotPassword = () => {
    return (
        render(
            <Provider store={store}>
                <ForgotPassword />
            </Provider>
        )
    )
}

describe("ForgotPassword", () => {

    test("renders properly", () => {
        renderForgotPassword();
        expect(screen.getByAltText("mindfire logo")).toBeInTheDocument();
        expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
        expect(screen.getByText("Don't worry, we've got you covered!")).toBeInTheDocument();
        expect(screen.getByLabelText("Enter Registered Email address")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("E.g. johndoe@gmail.com")).toBeInTheDocument();
        expect(screen.getByRole("button" ,{name: "Get Reset Password Link"})).toBeInTheDocument();
    })

    test("show email required error message", async () => {
        userEvent.setup();
        renderForgotPassword();
        const submitButton = screen.getByRole("button", {name: "Get Reset Password Link"});
        await userEvent.click(submitButton);
        const emailRequiredError = await screen.findByText("Please enter your email");
        expect(emailRequiredError).toBeInTheDocument();
    })

    test("show error message when invalid email entered", async () => {
        userEvent.setup();
        renderForgotPassword();
        const inputElement = screen.getByPlaceholderText("E.g. johndoe@gmail.com");
        await userEvent.type(inputElement, "siva@");
        const submitButton = screen.getByRole("button", {name: "Get Reset Password Link"});
        await userEvent.click(submitButton);
        const invalidEmailError = await screen.findByText("Invalid email !");
        expect(invalidEmailError).toBeInTheDocument();
    })

})