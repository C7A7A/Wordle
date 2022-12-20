const MessageContainer = ({messages}) => {
    return <div className='message-container'>
        {messages.map((m, index) => 
            <div key={index} className='user-message'>
                <div className='message'> {index}: {m.message} - {m.userName} </div>
            </div>
        )}
    </div>
}

export default MessageContainer;