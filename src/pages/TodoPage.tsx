import '../styles/TodoPage.scss';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo, TodoCheckbox } from '../types/todo';
import { CreateTodo, generateID } from '../helpers/db.service';
import { Modal, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

const TodoPage = () => {
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [_emoji, setEmoji] = useState<string>('');
    const [_title, setTitle] = useState<string>('');
    const [_description, setDescription] = useState<string>('');
    const [_checks, setChecks] = useState<TodoCheckbox[]>();

    const [isCreateMode, setCreatedMode] = useState<boolean>(false);

    const _cRoute = useLocation();

    const [todo, setTodo] = useState<Todo>();

    const _id = generateID();

    const [openModal, setOpenModal] = useState(false);

    // checkbox form 
    const [_cTitle, setCTitle] = useState<string>('');
    const [_cDescription, setCDescription] = useState<string>('');
    const [_cStartDate, setCStartDate] = useState<Date>(new Date());
    const [_cEndDate, setCEndDate] = useState<Date>(new Date());

    useEffect(() => {
        if (_cRoute.pathname === '/new') {
            setCreatedMode(true);
            setTodo({ id: _id, title: '', checks: [], emoji: '', description: '' });
        }
    }, [_cRoute]);

    useEffect(() => {
        handleModification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_title, _description, _checks, _emoji]);

    function handleInputClick() {
        setShowPicker(!showPicker);
    }

    function handleEmojiSelect(e: EmojiClickData) {
        setEmoji(e.emoji);
        setShowPicker(false);
        handleModification();
    }

    function handleModification() {
        setTodo({ id: _id, title: _title, checks: _checks, emoji: _emoji, description: _description });

        setTimeout(() => {
            if (todo?.title && todo.emoji && todo.id)
                CreateTodo(todo!);
        }, 2000);
    }

    function submitCheckboxForm(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        if (_cTitle == null || _cTitle === '')
            return;

        const checkbox: TodoCheckbox = {
            order: todo?.checks?.length || 0,
            checked: false,
            label: _cTitle,
            description: _cDescription,
            startDate: _cStartDate,
            endDate: _cEndDate,
        };

        const tempArr = _checks;
        tempArr?.push(checkbox);
        setChecks(tempArr);

        setCDescription('');
        setCStartDate(new Date());
        setCEndDate(new Date());
        setCTitle('');
        setOpenModal(false);
    }

    return (
        <div className='todo-content'>
            <div className='todo-header'>
                <input type='text' onClick={handleInputClick} value={_emoji} onChange={() => { console.log("hello"); }} />
                <input type='text' placeholder='Entrez un nom' value={_title} onChange={(e) => { setTitle(e.target.value); }} />
                {showPicker ? <div className='picker'><EmojiPicker width={300} onEmojiClick={(emoji, event) => { handleEmojiSelect(emoji); }}></EmojiPicker></div> : <></>}
            </div>
            <div className='todo-description'>
                <textarea rows={5} value={_description} onChange={(e) => { setDescription(e.target.value); }}></textarea>
            </div>
            <div className='todo-checkbox'>
                <div className='todo-checkbox-header'>
                    <h2>Checklist</h2>
                    <button onClick={() => { setOpenModal(true); }}>Add new</button>
                </div>
                {
                    !isCreateMode ?
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
                        :
                        <></>
                }
            </div>
            <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
            >
                <div className='checkbox-form'>
                    <form>
                        <TextInput type={'text'} label='Label de la checkbox' required={true} value={_cTitle} onChange={(e) => { setCTitle(e.target.value); }} />
                        <TextInput type={'text'} label='Description de la checkbox' value={_cDescription} onChange={(e) => { setCDescription(e.target.value); }} />
                        <DatePicker label="Début de la tâche" value={_cStartDate} onChange={(e) => { setCStartDate(e!); }} />
                        <DatePicker label="Fin de la tâche" value={_cEndDate} onChange={(e) => { setCEndDate(e!); }} />
                        <button onClick={(e) => { submitCheckboxForm(e); }}>Enregistrer</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default TodoPage;