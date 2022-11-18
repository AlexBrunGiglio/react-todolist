import '../styles/LeftMenu.scss';
import * as Icon from "react-icons/io";
import { GetTodos } from '../helpers/db.service';
interface props {
    children: React.ReactNode;
}
const LeftMenu = ({ children }: props) => {

    const todos = GetTodos();
    console.log("🚀 ~ LeftMenu ~ todos", todos);

    return (
        <div className='layout'>
            <div className='menu'>
                <div className='icon'>
                    <img alt='app-logo' src='https://alexandrebrungiglio.fr/static/media/logo.2f4ffd121f30d0eb7bbd.png' />
                </div>
                <a href='/'><Icon.IoIosHome></Icon.IoIosHome> Home</a>
                {todos.map((x) => { return (<a href={'/todo/' + x.id}>{x.title}</a>); })}
                {todos.length === 0 ?? <p>Vous n'avez pas encore de liste créée</p>}
                <div className='fixed-bottom'>
                    <a href='/new'> <Icon.IoMdAdd></Icon.IoMdAdd> New todo</a>
                </div>
            </div>
            <div className='content'>
                {children}
            </div>
        </div>
    );
};

export default LeftMenu;