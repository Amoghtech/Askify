import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import Dashboardactions from "./Dashboardactions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = () => {

  const { user, profile,loading } = useSelector((state) => ({
    user: state.auth.user,
    profile: state.profile.profile,
    loading: state.profile.loading,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile())
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <Dashboardactions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
              <i className="fas fa-user-minus">Delete my account</i>
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet set up a profile , please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  ); /*
  if user exists then so his user.name
  if there is loading and profile is null */
};

export default Dashboard;
