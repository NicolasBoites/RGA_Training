import { Project } from "./Project";
const baseUrl = "http://localhost:3000";
const url = `${baseUrl}/project`;
const user = localStorage.getItem("user");

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the project(s).";
    default:
      return "There was an error retrieving the project(s). Please try again.";
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

async function parseJSON(response: Response) {
  const jsonResponse = await response.json();

  return jsonResponse.data;
}

// eslint-disable-next-line
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToProjectModels(data: any[]): Project[] {
  let projects: Project[] = data.map(convertToProjectModel);
  return projects;
}

function convertToProjectModel(item: any): Project {
  return new Project(item);
}

function getAuthHeaders(extraHeaders = {}) {
  const userString = localStorage.getItem("user");

  if (!userString) {
    throw new Error("No authentication token found. Please log in.");
  }

  let user;
  try {
    user = JSON.parse(userString);
  } catch {
    throw new Error("Invalid user session data.");
  }

  if (!user.accessToken) {
    throw new Error("No authentication token found. Please log in.");
  }

  return {
    ...extraHeaders,
    Authorization: `Bearer ${user.accessToken}`,
  };
}

const projectAPI = {
  get(page = 1, limit = 10, name = null) {
    return (
      fetch(`${url}?_name=${name}&_page=${page}&_limit=${limit}&_sort=name`, {
        headers: getAuthHeaders(),
      })
        // .then(delay(2000))
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToProjectModels)
        .catch((error: TypeError) => {
          console.log("log client error " + error);
          throw new Error(
            "There was an error retrieving the projects. Please try again."
          );
        })
    );
  },
  put(project: Project) {
    return (
      fetch(`${url}/${project._id}`, {
        method: "PUT",
        body: JSON.stringify(project),
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
      })
        // .then(delay(2000))
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
          console.log("log client error " + error);
          throw new Error(
            "There was an error updating the project. Please try again."
          );
        })
    );
  },

  find(id: string) {
    return fetch(`${url}/${id}`, {
      headers: getAuthHeaders(),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModel);
  },

  post(project: Project) {
    return (
      fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
      })
        // .then(delay(2000))
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
          console.log("log client error " + error);
          throw new Error(
            "There was an error updating the project. Please try again."
          );
        })
    );
  },

  delete(project: Project) {
    return (
      fetch(`${url}/${project._id}`, {
        method: "DELETE",
        body: JSON.stringify(project),
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
      })
        // .then(delay(2000))
        .then(checkStatus)
        .then(parseJSON)
        // .then(convertToProjectModels)
        .catch((error: TypeError) => {
          console.log("log client error " + error);
          throw new Error(
            "There was an error retrieving the projects. Please try again."
          );
        })
    );
  },
};

export { projectAPI };
