import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";

import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

export default function GithubState(props) {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async (inputValue) => {
    setLoading();
    const resa = await axios.get(
      `https://api.github.com/search/users?q=${inputValue}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: resa.data.items,
    });
  };

  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const getUser = async (userName) => {
    setLoading();
    const resa = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_USER,
      payload: resa.data,
    });
  };

  const getUserRepos = async (userName) => {
    setLoading();
    const resa = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc
      &client_id=${githubClientId}
      &client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: resa.data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
}
