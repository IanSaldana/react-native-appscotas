import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get("http://10.0.2.2:8000/api/user/"); // Cambia la URL a la correcta
    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
