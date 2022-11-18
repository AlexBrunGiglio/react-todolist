import '../styles/TodoPage.scss';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Todo, TodoCheckbox } from '../types/todo';
import { CreateTodo, FindTodo, generateID } from '../helpers/db.service';
import { Modal, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import * as Icon from 'react-icons/bs';
let _id = generateID();


const TodoPage = () => {
    const [showPicker, setShowPicker] = useState<boolean>(false);


    const [_emoji, setEmoji] = useState<string>('');
    const [_title, setTitle] = useState<string>('');
    const [_description, setDescription] = useState<string>('');
    const [_checks, setChecks] = useState<TodoCheckbox[]>([]);

    const [isCreateMode, setIsCreateMode] = useState<boolean>(false);

    const _cRoute = useLocation();

    const [todo, setTodo] = useState<Todo>();


    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    // checkbox form 
    const [_cTitle, setCTitle] = useState<string>('');
    const [_cDescription, setCDescription] = useState<string>('');
    const [_cStartDate, setCStartDate] = useState<Date>(new Date());
    const [_cEndDate, setCEndDate] = useState<Date>(new Date());

    useEffect(() => {
        if (_cRoute.pathname === '/new') {
            setIsCreateMode(true);
            console.log("🚀 ~ useEffect ~ _id", _id);
            setTodo({ id: _id, title: '', checks: [], emoji: '', description: '' });
        } else {
            _id = params['id']!;
            const getTodo = FindTodo(_id);
            setTodo(getTodo);
            setEmoji(getTodo.emoji!);
            setTitle(getTodo.title!);
            setDescription(getTodo.description!);
            setChecks(getTodo.checks! || []);
        }
    }, [_cRoute]);

    function handleInputClick() {
        setShowPicker(!showPicker);
    }

    function handleEmojiSelect(e: EmojiClickData) {
        setEmoji(e.emoji);
        setShowPicker(false);
    }

    function saveTodo() {
        const newTodo = { id: _id, title: _title, checks: _checks, emoji: _emoji, description: _description };
        setTodo(newTodo);
        CreateTodo(newTodo!);
        navigate('/todo/' + _id);
    }

    function submitCheckboxForm(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        if (_cTitle == null || _cTitle === '')
            return;

        console.log(todo);


        const checkbox: TodoCheckbox = {
            order: todo?.checks?.length || 0,
            checked: false,
            label: _cTitle,
            description: _cDescription,
            startDate: _cStartDate,
            endDate: _cEndDate,
        };

        setChecks(prevChecks => [...prevChecks, checkbox]);

        setCDescription('');
        setCStartDate(new Date());
        setCEndDate(new Date());
        setCTitle('');
        setIsCreateMode(false);
        setOpenModal(false);
    }

    return (
        <div className='todo-content'>
            <div className='todo-header'>
                <div>
                    <input type='text' onClick={handleInputClick} value={_emoji} onChange={() => { console.log("hello"); }} />
                    <input type='text' placeholder='Entrez un nom' value={_title} onChange={(e) => { setTitle(e.target.value); }} />
                </div>
                <div>
                    <button onClick={() => saveTodo()}>Enregistrer</button>
                </div>
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
                            {_checks?.length ?
                                _checks?.map((x) => {
                                    console.log("🚀 ~ {_checks?.map ~ x", x);
                                    console.log("🚀 ~ {_checks?.map ~ _checks", _checks);
                                    return (
                                        <div className='check' key={x.label + '' + x.order}>
                                            <input type={'checkbox'} />
                                            <div className='checkbox-text'>
                                                <p><b>{x.label}</b></p>
                                                <p>{x.description}</p>
                                                <div className='inline'>
                                                    <div className='time'>
                                                        <span className='inline'><Icon.BsFillCalendarEventFill></Icon.BsFillCalendarEventFill> {new Date(x.startDate ?? '').toLocaleDateString()}</span>
                                                        <span className='inline'><Icon.BsFillCalendarWeekFill></Icon.BsFillCalendarWeekFill> {new Date(x.endDate ?? '').toLocaleDateString()}</span>
                                                    </div>
                                                    <div className='tags'>
                                                        <span>tags 1</span>
                                                        <span>tags 2</span>
                                                        <span>tags 3</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                                :
                                <p>Aucune checklist</p>
                            }
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