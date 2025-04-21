import React from "react";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import routing from "./routes";
import DefaultLayout from "./components/layouts";
export type RouteItem = {
  key: string;
  path: string;
  component: React.ComponentType;
  layout?: React.ComponentType;
};
function App() {
  return (
    <div>
      <Routes>
        {routing.map((route: RouteItem) => {
          const Page = route.component;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let Layout: any = DefaultLayout;

          if (route.layout === null) Layout = Fragment;
          else if (route.layout) Layout = route.layout;

          return (
            <Route
              key={route.key}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
