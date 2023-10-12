import { System } from "../Helpers/types";

// const url = process.env.API_BASE_URL;
const url = process.env.API_BASE_URL || "http://localhost:3333";

/**
 * List all systems, filtered by query string.
 * @example querySystems("?description=description1&acronym=acronym1&email=email1")
 */
export const querySystems = async (queryString: string) => {
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

/**
 * List all systems.
 */
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

/**
 * Get a system by id.
 * @example getSystemById(1)
 */
export const getSystemById = async (id: number) => {
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

/**
 * Create a new system.
 * @example createSystem({description: "description1", acronym: "acronym1", email: "email1"})
 */
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

/**
 * Update a system.
 * @example updateSystem(1, {description: "description1", acronym: "acronym1", email: "email1"})
 */
export const updateSystem = async (id: number, system: System) => {
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

/**
 * Delete a system.
 * @example deleteSystem(1)
 */
export const deleteSystem = async (id: number) => {
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
