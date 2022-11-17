import '../styles/TodoPage.scss';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';

const TodoPage = () => {
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [emoji, setEmoji] = useState<string>();

    function handleInputClick() {
        setShowPicker(!showPicker);
        console.log("🚀 ~ TodoPage ~ showPicker", showPicker);
    }

    function handleEmojiSelect(e: EmojiClickData) {
        console.log("🚀 ~ handleEmojiSelect ~ e", e);
        setEmoji(e.emoji);
        setShowPicker(false);
    }

    return (
        <div className='todo-content'>
            <div className='todo-header'>
                <input type='text' onClick={handleInputClick} value={emoji} />
                <input type='text' placeholder='Entrez un nom' />
                {showPicker ? <div className='picker'><EmojiPicker width={300} onEmojiClick={(emoji, event) => { handleEmojiSelect(emoji); }}></EmojiPicker></div> : <></>}
            </div>
            <div className='todo-description'>
                <textarea rows={5} ></textarea>
            </div>
            <div className='todo-checkbox'>
                <div className='todo-checkbox-header'>
                    <h2>Checklist</h2>
                    <button>Add new</button>
                </div>
                <div className='checkboxs'>
                    <div className='check'>
                        <input type={'checkbox'} />
                        <div className='checkbox-text'>
                            <p><b>Checkbox title</b></p>
                            <p>Checkbox description</p>
                            <div className='tags'>
                                <span>tags 1</span>
                                <span>tags 2</span>
                                <span>tags 3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoPage;