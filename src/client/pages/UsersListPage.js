import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from 'client/actions';
import { Helmet } from 'react-helmet'

const UsersList = ({ users, fetchUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers])

  const renderUsers = () => {
    return users.map(user => {
      return <li key={user.id}>{user.name}</li>
    })
  }

  const head = () => {
    return (
      <Helmet>
        <title>{`${users.length} Users Loaded`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    )
  }

  return (
    <div>
      { head() }
      Here's a big list of users:
      <ul>
        {renderUsers()}
      </ul>
    </div>
  )
}

const fetchInitialData = (store) => {
  return store.dispatch(fetchUsers());
}

const mapStateToProps = (state) => {
  return { users: state.users }
}

export default {
  fetchInitialData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList)
  // component: connect(mapStateToProps, { fetchAdmins })(requireAuth(UsersList))
};