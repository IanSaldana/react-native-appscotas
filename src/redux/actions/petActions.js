import axios from "axios";
import { fetchPetsSuccess } from "../reducers/petReducer";

export const fetchPets = () => async (dispatch) => {
  try {
    const response = await axios.get("http://10.0.2.2:8000/api/mascotas/");
    dispatch(fetchPetsSuccess(response.data));
  } catch (error) {
    console.error("Error fetching pets:", error);
  }
};
