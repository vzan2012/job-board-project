import CompanyPage from "../pages/CompanyPage";
import CreateJobPage from "../pages/CreateJobPage";
import HomePage from "../pages/HomePage";
import JobPage from "../pages/JobPage";
import LoginPage from "../pages/LoginPage";

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
      component: HomePage,
      index: true,
    },
    {
      path: "/companies/:companyId",
      component: CompanyPage,
      index: false,
    },
    {
      path: "/jobs/new",
      component: CreateJobPage,
      index: false,
    },
    {
      path: "/jobs/:jobId",
      component: JobPage,
      index: false,
    },
    {
      path: "/login",
      component: (props) => (
        <LoginPage {...props} onLogin={requestLoginHandler} />
      ),
      index: false,
    },
  ];
};
