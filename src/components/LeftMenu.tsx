import '../styles/LeftMenu.scss';
import * as Icon from "react-icons/io";
interface props {
    children: React.ReactNode;
}
const LeftMenu = ({ children }: props) => {

    return (
        <div className='layout'>
            <div className='menu'>
                <div className='icon'>
                    <img alt='app-logo' src='https://alexandrebrungiglio.fr/static/media/logo.2f4ffd121f30d0eb7bbd.png' />
                </div>
                {/* <a href='/#'>TODO 1</a> */}
                <p>Vous n'avez pas encore de liste créée</p>
                <div className='fixed-bottom'>
                    <button> <Icon.IoMdAdd></Icon.IoMdAdd> New todo</button>
                </div>
            </div>
            <div className='content'>
                {children}
            </div>
        </div>
    );
};

export default LeftMenu;