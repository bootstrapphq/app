import __s_agent from "/node_modules/@bootstrapp/agent/models/schema.js";
import __s_ide from "/node_modules/@bootstrapp/ide/models/schema.js";
import __s_cms from "/node_modules/@bootstrapp/cms/models/schema.js";
import __s_devops from "/node_modules/@bootstrapp/devops/models/schema.js";
import __s___project from "/models/schema.js";
export default {
  "agent": { models: __s_agent, namespace: true },
  "ide": { models: __s_ide, namespace: false },
  "cms": { models: __s_cms, namespace: true },
  "devops": { models: __s_devops, namespace: true },
  "__project__": { models: __s___project, namespace: false },
};
