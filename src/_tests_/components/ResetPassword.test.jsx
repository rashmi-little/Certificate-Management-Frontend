import { render, screen } from "@testing-library/react"
import ResetPassword from "../../pages/sign-in/components/ResetPassword"
import { Provider } from "react-redux"
import { store } from "../../redux/store"
import { BrowserRouter } from "react-router-dom"
import { expect } from "vitest"
import userEvent from "@testing-library/user-event"

const renderResetPassword = () => {
    return render(<ResetPassword />, {
        wrapper: ({ children }) => <Provider store={store} >
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    })
}

describe("ResetPassword", () => {

    test("renders properly", () => {
        renderResetPassword();
        const newPasswordText = screen.getByText("New Password");
        expect(newPasswordText).toBeInTheDocument();
        const newPasswordPlaceholderText = screen.getByPlaceholderText("Enter new password");
        expect(newPasswordPlaceholderText).toBeInTheDocument();
        const confirmPasswordText = screen.getByText("Confirm Password");
        expect(confirmPasswordText).toBeInTheDocument();
        const confirmPasswordPlaceholderText = screen.getByPlaceholderText("Re enter new password");
        expect(confirmPasswordPlaceholderText).toBeInTheDocument();
        const submitButton = screen.getByRole("button", {name: "Submit"});
        expect(submitButton).toBeInTheDocument();
        const visibilityOffIcon = screen.getByTestId("VisibilityOffIcon");
        expect(visibilityOffIcon).toBeInTheDocument();
    })

    test("renders error messages for input fields when submit without enter values", async () => {
        userEvent.setup();
        renderResetPassword();
        const submitButton = screen.getByRole("button", {name: "Submit"});
        await userEvent.click(submitButton);
        const newPasswordError = await screen.findByText("Please enter the password");
        expect(newPasswordError).toBeInTheDocument();
        const confirmPasswordError = await screen.findByText("Please enter confirm password");
        expect(confirmPasswordError).toBeInTheDocument();
    })

    test("render new password length error if less than 8", async () => {
        userEvent.setup();
        renderResetPassword();
        const newPasswordInput = screen.getByPlaceholderText("Enter new password");
        await userEvent.type(newPasswordInput, "siva1@");
        const submitButton = screen.getByRole("button", {name: "Submit"});
        await userEvent.click(submitButton);
        const errorMessage = await screen.findByText("Password length be greater than 8");
        expect(errorMessage).toBeInTheDocument();
    })

    test("renders include atleast one digit & special character error", async () => {
        userEvent.setup();
        renderResetPassword();
        const newPasswordInput = screen.getByPlaceholderText("Enter new password");
        await userEvent.type(newPasswordInput, "sivakrishna");
        const submitButton = screen.getByRole("button", {name: "Submit"});
        await userEvent.click(submitButton);
        const error = await screen.findByText("Password must contain at least one digit and one special character");
        expect(error).toBeInTheDocument();
    })

    test("renders password doesn't match error", async () => {
        userEvent.setup();
        renderResetPassword();
        const newPasswordInput = screen.getByPlaceholderText("Enter new password");
        await userEvent.type(newPasswordInput, "sivakrishna1!");
        const confirmPasswordInput = screen.getByPlaceholderText("Re enter new password");
        await userEvent.type(confirmPasswordInput, "sivakrishna1@");
        const submitButton = screen.getByRole("button", {name: "Submit"});
        await userEvent.click(submitButton);
        const error = await screen.findByText("Passwords do not match");
        expect(error).toBeInTheDocument();
    })

})