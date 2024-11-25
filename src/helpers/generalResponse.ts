const generalResponse = (
  response: any,
  data: any = null,
  message = "",
  response_type: "success" | "error" = "success",
  toast = false,
  statusCode = 200
) => {
  response.status(statusCode).send({
    data: data,
    message: message,
    toast: toast,
    response_type: response_type,
  });
};
export default generalResponse;
