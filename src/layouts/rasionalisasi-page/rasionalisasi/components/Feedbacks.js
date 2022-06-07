import './feedbacks-styles.css';

const Feedbacks = ({isValid,messages}) => {
  const className = isValid?"valid-feedback":"invalid-feedback";

  return (
    <div className={"feedback "+className}>
      {
        messages?.map((err,idx) => (
          <div key={idx}>{err}</div>
        ))
      }
    </div>
  )
}

export default Feedbacks;