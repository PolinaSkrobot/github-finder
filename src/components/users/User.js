import React, { useEffect, Fragment } from "react";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import GithubContext from "../../context/github/githubContext";
import { useContext } from "react";

const User = () => {
  const githubContext = useContext(GithubContext);
  const { user, getUser, loading, getUserRepos, repos } = githubContext;
  const { login } = useParams();
  useEffect(() => {
    getUser(login);
    getUserRepos(login);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    html_url,
    company,
    followers,
    following,
    public_gists,
    public_repos,
    hireable,
  } = user;
  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        {" "}
        Back to Search
      </Link>
      Hireable: {""}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <badge className='badge badge-primary'>Followers: {followers}</badge>
        <badge className='badge badge-success'>Following: {following}</badge>
        <badge className='badge badge-light'>
          Public Repos: {public_repos}
        </badge>
        <badge className='badge badge-dark'>Public Gists: {public_gists}</badge>
      </div>
      <Repos repos={repos}></Repos>
    </Fragment>
  );
};

export default User;
