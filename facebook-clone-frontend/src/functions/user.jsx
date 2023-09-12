import axios from "axios";

export const updateprofilePicture = async (url, token) => {
  try {
    const { data } = await axios.put(
      "http://localhost:8000/updateProfilePicture",
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
