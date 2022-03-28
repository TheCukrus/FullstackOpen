
const Notification = (props) =>
{

    setTimeout(() => props.setNotification(null), 5000)

    if (props.message === null)
    {
        return null
    }


    return (
        <div className="notification">
            {props.message}

        </div>
    )
}

export default Notification;