import { expect, vi } from "vitest"
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../../redux/user/Action";
import { store } from "../../redux/store"
import { USER_CREATE_CLEAN, USER_CREATE_FAILURE, USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_DELETE_CLEAN, USER_DELETE_FAILURE, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_GET_BY_ID_CLEAN, USER_GET_BY_ID_FAILURE, USER_GET_BY_ID_REQUEST, USER_GET_BY_ID_SUCCESS, USER_UPDATE_CLEAN, USER_UPDATE_FAILURE, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USERS_GET_CLEAN, USERS_GET_FAILURE, USERS_GET_REQUEST, USERS_GET_SUCCESS } from "../../redux/user/ActionType";
import { api } from "../../config/config";
import { waitFor } from "@testing-library/react";

function getData() {
    return ({
        id: 1,
        firstName: "Gedela",
        lastName: "Sivakrishna",
        email: "sivakrishna@gmail.com"
    });
}

function getUsersList() {
    return (
        [
            {
                id: 1,
                firstName: "Gedela",
                lastName: "Sivakrishna",
                email: "sivakrishna@gmail.com"
            },
            {
                id: 2,
                firstName: "user",
                lastName: "1",
                email: "user1@gmail.com"
            }
        ]
    )
}

vi.mock("../../config/config", () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    }
}))

test("Should dispatch USER_CREATE_SUCCESS when api request successfull", async () => {
    // allows to track what actions are dispatched
    const mockDispatch = vi.spyOn(store, "dispatch");
    const mockData = {
        id: 1,
        firstName: "Gedela",
        lastName: "Sivakrishna",
        email: "sivakrishna@gmail.com"
    }

    api.post.mockResolvedValueOnce({ data: mockData });

    createUser(mockData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: USER_CREATE_REQUEST });
    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({ type: USER_CREATE_SUCCESS, payload: mockData });
    });

    setTimeout(() => {
        expect(mockDispatch).toHaveBeenCalledWith({ type: USER_CREATE_CLEAN });
    }, 3000);

})

test("should dispatch USER_CREATE_FAIL when api request fails", async () => {
    const mockDispatch = vi.spyOn(store, "dispatch");
    const mockError = { response: { data: { detail: "Error occured" } } };
    api.post.mockRejectedValueOnce(mockError);

    createUser({ id: 1, email: "sivakrishna@gmail.com" })(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: USER_CREATE_REQUEST });
    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({ type: USER_CREATE_FAILURE, payload: "Error occured" });
    })
})

test("should dispatch USER_UPDATE_SUCCESS when update api is successfull", async () => {
    const mockDispatch = vi.spyOn(store, "dispatch");
    const mockData = getData();
    console.log("MOCK DATA = ", mockData);
    api.put.mockResolvedValueOnce({ data: mockData });

    updateUser(mockData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: USER_UPDATE_REQUEST });

    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({ type: USER_UPDATE_SUCCESS, payload: mockData });
    })

    setTimeout(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USER_UPDATE_CLEAN});
    }, 3000);
})

test("should dispatch USER_UPDATE_FAILURE when update api is failed", async () => {
    const mockDispatch = vi.spyOn(store, "dispatch");
    const mockError = {response: {data: {detail: "Error updating user"}}};

    api.put.mockRejectedValueOnce(mockError);

    updateUser(getData())(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({type: USER_UPDATE_REQUEST});

    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USER_UPDATE_FAILURE, payload: "Error updating user"});
    })

    setTimeout(()=>{
        expect(mockDispatch).toHaveBeenCalledWith({type: USER_UPDATE_CLEAN});
    },3000)
})

test("should dispatch USER_DELETE_SUCCESS when delete api is success", async () => {
    const mockDispatch = vi.spyOn(store, "dispatch");
    api.delete.mockResolvedValueOnce();

    deleteUser({id: 1})(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({type: USER_DELETE_REQUEST});

    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USER_DELETE_SUCCESS});
    })

    setTimeout(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USER_UPDATE_CLEAN});
    }, 3000);
})

test("should dispatch USER_DELETE_FAILURE when delete api fails", async () => {
    const mockDispatch = vi.spyOn(store, "dispatch");
    const mockError = {response: {data: {detail: "Error deleting"}}};
    api.delete.mockRejectedValueOnce(mockError);

    deleteUser({id: 1})(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({type: USER_DELETE_REQUEST});

    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USER_DELETE_FAILURE, payload: "Error deleting"});
    })

    setTimeout(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USER_DELETE_CLEAN});
    }, 3000);
})

test("should dispatch USER_GET_BY_ID_SUCCESS when get user api success", async () => {
    const mockDispatch = vi.spyOn(store, "dispatch");
    const mockData = getData();
    api.get.mockResolvedValueOnce({data: mockData});

    getUserById({id: 1})(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({type: USER_GET_BY_ID_REQUEST});

    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USER_GET_BY_ID_SUCCESS, payload: mockData});
    })

    setTimeout(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USER_GET_BY_ID_CLEAN});
    }, 3000);

})

test("should Dispatch USER_GET_BY_ID_FAILURE when get user api fails", async () => {
    const mockDispatch = vi.spyOn(store, "dispatch");
    const mockError = {response: {data: {detail: "Error getting user by id"}}};

    api.get.mockRejectedValueOnce(mockError);

    getUserById({id: 1})(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({type: USER_GET_BY_ID_REQUEST});

    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USER_GET_BY_ID_FAILURE, payload: "Error getting user by id"});
    })

    setTimeout(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USER_GET_BY_ID_CLEAN});
    }, 3000);
})

test("should dispatch USERS_GET_SUCCESS when get users api success", async () => {
    const mockDispatch = vi.spyOn(store, "dispatch");
    const mockUsers = getUsersList();

    api.get.mockResolvedValueOnce({data: mockUsers});

    getUsers({pageNumber:10,pageSize:10})(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({type: USERS_GET_REQUEST});

    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USERS_GET_SUCCESS, payload: mockUsers});
    })

    setTimeout(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USERS_GET_CLEAN});
    }, 3000);

})

test("should dispatch USERS_GET_FAILURE when get users api fails", async () => {
    const mockDispatch = vi.spyOn(store, "dispatch");
    const mockError = {response: {data: {detail: "Error fetching users"}}};

    api.get.mockRejectedValueOnce(mockError);

    getUsers({pageNumber:10, pageSize:10})(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({type: USERS_GET_REQUEST});

    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USERS_GET_FAILURE, payload: "Error fetching users"});
    })

    setTimeout(() => {
        expect(mockDispatch).toHaveBeenCalledWith({type: USERS_GET_CLEAN});
    }, 3000);
    
})