import { System } from "../Helpers/types";

// const url = process.env.API_BASE_URL;
const url = "http://localhost:3333";

export const querySystems = async (queryString: string | any) => {
  try {
    const response = await fetch(`${url}/systems/${queryString}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllSystems = async () => {
  try {
    const response = await fetch(`${url}/systems`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSystemById = async (id: string | number) => {
  try {
    const response = await fetch(`${url}/systems/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createSystem = async (system: System) => {
  try {
    const response = await fetch(`${url}/systems`, {
      method: "POST",
      body: JSON.stringify(system),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateSystem = async (id: string | number, system: System) => {
  try {
    const response = await fetch(`${url}/systems/${id}`, {
      method: "PATCH",
      body: JSON.stringify(system),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteSystem = async (id: string | number) => {
  try {
    const response = await fetch(`${url}/systems/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
