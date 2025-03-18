import "@testing-library/jest-dom";
import { test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SignIn from "../../pages/sign-in/SignIn";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import userEvent from "@testing-library/user-event";
import { CLEAR_LOGIN_ERROR, GET_USER_FROM_TOKEN_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS } from "../../redux/login/ActionType";

afterEach(() => {
    // Resets all mocks after each test
    vi.restoreAllMocks();
});

// mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

// mock login api call
vi.mock("../../redux/login/Action", () => ({
    login: vi.fn((credentials) => async (dispatch) => {
        dispatch({ type: CLEAR_LOGIN_ERROR });
        console.log(store.getState());
        if (credentials.data.email === "sivakrishna@gmail.com" && credentials.data.password === "mindfire") {
            dispatch({ type: LOGIN_SUCCESS, payload: { token: "mockToken" } });
        }
        else {
            dispatch({ type: LOGIN_FAILURE, payload: "Invalid username or password" });
        }
    }),

    // Mocking getUserFromToken method 
    getUserFromToken: vi.fn(() => (dispatch) => {
        dispatch({ type: GET_USER_FROM_TOKEN_SUCCESS, payload: { id: 1, name: "Test User", email: "test@example.com" } });
    }),
}));


// render the component
const renderLogin = () => {
    return (
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignIn />
                </BrowserRouter>
            </Provider>
        )
    )
};

test("Check If all text is displayed properly in Login page", () => {
    renderLogin();
    expect(screen.getByText(/Logo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Forgot your password?" })).toBeInTheDocument();
})

test("Show error message for invalid input fields", async () => {
    renderLogin();
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(await screen.findByText(/Please enter your email/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please enter password/i)).toBeInTheDocument();
})

test("Show error message for invalid email input", async () => {
    renderLogin();
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole("button", { name: "Sign in" });

    // Enter invalid email
    await userEvent.type(emailInput, "xyz.com");
    await userEvent.click(submitButton);

    expect(await screen.findByText(/invalid email !/i)).toBeInTheDocument();
})

test("dispatch LOGIN_FAILURE if error occurs while logging in", async () => {
    const mockDispatch = vi.spyOn(store, "dispatch");

    renderLogin();
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: "Sign in" });

    await userEvent.type(emailInput, "sivakrishna@gmail.com");
    await userEvent.type(passwordInput, "mindfiree");
    await userEvent.click(submitButton);

    // login mock function is returning a function
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    // fetching the function returned by login 
    const dispatchedFunction = mockDispatch.mock.calls[0][0];
    // calling the function using mockDispatch
    await dispatchedFunction(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
        type: "LOGIN_FAILURE",
        payload: "Invalid username or password",
    });    

})

test("dispatch LOGIN_SUCCESS on successful login", async () => {
    const mockDispatch = vi.spyOn(store, "dispatch");

    renderLogin();
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: "Sign in" });

    await userEvent.type(emailInput, "sivakrishna@gmail.com");
    await userEvent.type(passwordInput, "mindfire");
    console.log(emailInput.value);
    console.log(passwordInput.value);
    await userEvent.click(submitButton);

    // login mock function is returning a function
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    // fetching the function returned by login 
    const dispatchedFunction = mockDispatch.mock.calls[0][0];
    // calling the function using mockDispatch
    await dispatchedFunction(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
        type: "LOGIN_SUCCESS",
        payload: { token: "mockToken" }
    });
})

test("redirect user to dashboard on successful login", async () => {
    renderLogin();
    userEvent.type(screen.getByLabelText(/Email/i), "sivakrishna@gmail.com");
    userEvent.type(screen.getByLabelText(/Password/i), "mindfire");
    userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");

})

test("click on forgot password opens modal", async () => {
    renderLogin();
    userEvent.click(screen.getByRole("button", { name: /Forgot your password?/i }));
    const modal = await screen.findByRole("dialog");
    expect(modal).toBeInTheDocument();
})
