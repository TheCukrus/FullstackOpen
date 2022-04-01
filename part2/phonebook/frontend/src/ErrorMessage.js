
const ErrorMessage = (props) =>
{
     setTimeout(() => props.setErrorMessage(null), 5000)

    if (props.message === null)
    {
        return null
    }


    return (
        <div className="error">
            {props.message}

        </div>
    )
}

export default ErrorMessage;