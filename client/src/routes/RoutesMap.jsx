import { lazy } from "react";

// Lazy Load
const LazyCompanyPage = lazy(() => import("../pages/CompanyPage"));
const LazyCreateJobPage = lazy(() => import("../pages/CreateJobPage"));
const LazyHomePage = lazy(() => import("../pages/HomePage"));
const LazyJobPage = lazy(() => import("../pages/JobPage"));
const LazyLoginPage = lazy(() => import("../pages/LoginPage"));

/**
 * RoutesMap - Page Routes
 *
 * @param {{ requestLoginHandler: any; }} param0
 * @param {*} param0.requestLoginHandler
 * @returns {{}}
 */
export const RoutesMap = ({ requestLoginHandler }) => {
  return [
    {
      path: "/",
      component: LazyHomePage,
      index: true,
    },
    {
      path: "/companies/:companyId",
      component: LazyCompanyPage,
      index: false,
    },
    {
      path: "/jobs/new",
      component: LazyCreateJobPage,
      index: false,
    },
    {
      path: "/jobs/:jobId",
      component: LazyJobPage,
      index: false,
    },
    {
      path: "/login",
      component: (props) => (
        <LazyLoginPage {...props} onLogin={requestLoginHandler} />
      ),
      index: false,
    },
  ];
};
