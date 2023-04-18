import axios from "axios"

export function postData(taskCreated) {
  axios
    .post("http://localhost:5000/", taskCreated)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error.response);
    });
}
