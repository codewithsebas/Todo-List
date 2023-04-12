function Error({ statusCode }) {
  return <p>{statusCode ? `Error ${statusCode} en el servidor` : "Error en el cliente"}</p>;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
