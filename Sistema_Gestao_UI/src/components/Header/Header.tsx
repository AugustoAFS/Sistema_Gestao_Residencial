import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">Painel de Controle</h1>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <span className="user-avatar icon-user"></span>
            <span className="user-name">Usuário</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
