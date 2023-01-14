import "./Error.css";

function Error() {
  return (
    <div className="error">
      <h1>We were unable to complete your request</h1>
      <button onClick={() => window.location.reload()}>Please try to reload the page</button>
    </div>
  )
}
export default Error;