import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
  });

ReactDOM.render(
    <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode></ApolloProvider>,
  document.getElementById("root")
);