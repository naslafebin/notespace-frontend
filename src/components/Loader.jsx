import { ClipLoader } from "react-spinners"



const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "purple",
};

const Loader = ({loading}) => {
  return (
    <ClipLoader
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Loader