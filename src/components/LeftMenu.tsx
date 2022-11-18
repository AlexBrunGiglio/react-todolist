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
                    <a href='/'>
                        <img alt='app-logo' src='https://alexandrebrungiglio.fr/static/media/logo.2f4ffd121f30d0eb7bbd.png' />
                    </a>
                </div>
                {todos?.length ? todos?.map((x) => { return (<a key={x.id} href={'/todo/' + x.id}>{x.emoji} {x.title}</a>); }) : <p>Vous n'avez pas encore de liste créée</p>}
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