import MessageContainer from "./MessageContaienr";
import SendMessageForm from "./SendMessageForm";

const Chat = ({messages, sendMessage}) => <div>
    <div className='chat'>
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />
    </div>
</div>

export default Chat;