import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "http://localhost:4000/api/member/login",
      userCredential
    );
    if (res.data.userInfo._id) {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.userInfo });
    }
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const updateUserCall = async (id, dispatch) => {
  try {
    const res = await axios.get(`http://localhost:4000/api/users/${id}`);
    if (res.data) {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    }
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const documentCall = async (dispatch) => {
  try {
    const document = await axios.get("http://localhost:4000/api/documents");
    if (document.data) {
      dispatch({ type: "UPDATE_BOOKS", payload: document.data });
    }
  } catch (error) {}
};

export const librosSeguidosCall = async (userid, dispatch) => {
  try {
    const library = await axios.get(
      `http://localhost:4000/api/users/${userid}`
    );
    if (library?.data?.followLibraries) {
      dispatch({
        type: "UPDATE_FOLLOWS",
        payload: library?.data?.followLibraries,
      });
      dispatch({
        type: "UPDATE_FOLLOW_INUSER",
        payload: library?.data?.followLibraries.map((el) => el._id),
      });
    }

    // setUserLibraries(library?.data?.libraries);
    // setFollowsLibraries(library?.data?.followLibraries);
  } catch (err) {
    console.log(err);
  }
};

export const followLibraryCall = async (userId, libraryId, dispatch) => {
  try {
    const document = await axios.put(
      `http://localhost:4000/api/users/follow/${userId}`,
      { libraryId }
    );
    if (document) {
      librosSeguidosCall(userId, dispatch);
    }
  } catch (error) {}
};

export const unFollowLibraryCall = async (userId, libraryId, dispatch) => {
  try {
    const document = await axios.put(
      `http://localhost:4000/api/users/unfollow/${userId}`,
      { libraryId }
    );
    if (document) {
      librosSeguidosCall(userId, dispatch);
    }
  } catch (error) {}
};

export const updateLibrariesCall = async (dispatch) => {
  try {
    const library = await axios.get("http://localhost:4000/api/library");
    if (library) {
      dispatch({
        type: "UPDATE_MYLIBRARIES",
        payload: library?.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateMyLibraryCall = async (userId, dispatch) => {
  try {
    const library = await axios.get(
      `http://localhost:4000/api/users/${userId}`
    );
    if (library) {
      dispatch({
        type: "UPDATE_MY_LIBRARIES",
        payload: library?.data?.libraries,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
