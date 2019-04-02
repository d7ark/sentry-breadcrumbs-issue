import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/browser";

// provide sentry dsn
const SENTRY_DSN = null;
// choose from 0-4
const ATTEMPT_NB = 0;

if (ATTEMPT_NB === 0) {
  // aproached as at https://docs.sentry.io/platforms/javascript/default-integrations/
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new Sentry.Integrations.Breadcrumbs({ dom: false })]
  });
}

if (ATTEMPT_NB === 1) {
  // aproached as at https://github.com/getsentry/sentry-javascript/blob/master/packages/browser/examples/app.js#L49
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations(integrations) {
      return [
        new Sentry.Integrations.Breadcrumbs({ dom: false }),
        ...integrations
      ];
    }
  });
}

if (ATTEMPT_NB === 2) {
  // similar to attempt 1, trying to override breadcrumbs integration
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations(integrations) {
      return [
        ...integrations,
        new Sentry.Integrations.Breadcrumbs({ dom: false })
      ];
    }
  });
}

if (ATTEMPT_NB === 3) {
  // filter out breadcrumb integration and add new one
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations(integrations) {
      integrations = integrations.filter(
        integration => integration.name !== "Breadcrumbs"
      );
      return [
        ...integrations,
        new Sentry.Integrations.Breadcrumbs({ dom: false })
      ];
    }
  });
}

if (ATTEMPT_NB === 4) {
  // workaround using beforeBreadcrumb
  Sentry.init({
    beforeBreadcrumb: removeUiBreadcrumbs,
    dsn: SENTRY_DSN,
  });

  function removeUiBreadcrumbs(breadcrumb) {
    return breadcrumb.category.startsWith('ui.') ? null : breadcrumb;
  }
}

if (SENTRY_DSN != null) {
  ReactDOM.render(
    <App attemptNb={ATTEMPT_NB} />,
    document.getElementById("root")
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
} else {
  console.log('please set sentry dsn in index.js');
}
