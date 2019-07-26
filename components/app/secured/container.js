import React from "react";
import { Query } from "react-apollo";
import get from "lodash/get";
import gql from "graphql-tag";
import Context from "./context";
import Secured from ".";

const SESSION = gql`
  query me {
    me {
      user {
        _id
      }
    }
  }
`;

export default ({ children, token }) => (
  <Query
    ssr={false}
    query={SESSION}
    variables={{ token }}
    context={{ clientName: "secure" }}
  >
    {({ loading, error, data, refetch }) => (
      <Secured
        loading={loading}
        error={error}
        success={Boolean(get(data, "me.user"))}
        onLogin={token => {
          localStorage.token = token;
          refetch({ token });
        }}
      >
        <Context.Provider
          value={{
            user: get(data, "me.user"),
            logout: () => {
              delete localStorage.token;
              refetch({});
            }
          }}
        >
          {children}
        </Context.Provider>
      </Secured>
    )}
  </Query>
);
