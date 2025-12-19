import { useUsuarios } from '../../hooks/useUsuarios';
import { useCategorias } from '../../hooks/useCategorias';
import { useTransacoes } from '../../hooks/useTransacoes';
import { FinalidadeEnum } from '../../types';
import './Dashboard.css';

const Dashboard = () => {
  const { usuarios, loading: loadingUsuarios } = useUsuarios();
  const { categorias, loading: loadingCategorias } = useCategorias();
  const { transacoes, loading: loadingTransacoes } = useTransacoes();

  const stats = {
    totalReceitas: transacoes
      .filter(t => {
        const categoria = categorias.find(c => c.id === t.categoriaId);
        return categoria?.finalidade === FinalidadeEnum.Receita;
      })
      .reduce((sum, t) => sum + t.valor, 0),
    totalDespesas: transacoes
      .filter(t => {
        const categoria = categorias.find(c => c.id === t.categoriaId);
        return categoria?.finalidade === FinalidadeEnum.Despesa;
      })
      .reduce((sum, t) => sum + t.valor, 0),
    saldo: transacoes.reduce((sum, t) => {
      const categoria = categorias.find(c => c.id === t.categoriaId);
      return categoria?.finalidade === FinalidadeEnum.Receita ? sum + t.valor : sum - t.valor;
    }, 0),
  };

  const formatarValor = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const loading = loadingUsuarios || loadingCategorias || loadingTransacoes;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <div className="dashboard-welcome">
        <p className="dashboard-welcome-text">
          Bem-vindo ao Sistema de Gestão Residencial!
        </p>
        <p>Acompanhe suas métricas financeiras e gerencie seus recursos.</p>
      </div>

      {loading ? (
        <div className="dashboard-loading">Carregando dados...</div>
      ) : (
        <>
          <div className="dashboard-stats">
            <div className="dashboard-card">
              <h3 className="dashboard-card-title">Pessoas Cadastradas</h3>
              <p className="dashboard-card-value">{usuarios.length}</p>
              <span className="dashboard-card-info">
                {usuarios.filter(u => u.isMenorDeIdade).length} menores de idade
              </span>
            </div>
            
            <div className="dashboard-card">
              <h3 className="dashboard-card-title">Categorias</h3>
              <p className="dashboard-card-value">{categorias.length}</p>
              <span className="dashboard-card-info">
                {categorias.filter(c => c.finalidade === FinalidadeEnum.Despesa).length} despesas, {' '}
                {categorias.filter(c => c.finalidade === FinalidadeEnum.Receita).length} receitas
              </span>
            </div>
            
            <div className="dashboard-card">
              <h3 className="dashboard-card-title">Total de Transações</h3>
              <p className="dashboard-card-value">{transacoes.length}</p>
              <span className="dashboard-card-info">Todas as transações</span>
            </div>
            
            <div className="dashboard-card dashboard-card-highlight">
              <h3 className="dashboard-card-title">Saldo Total</h3>
              <p className={`dashboard-card-value ${stats.saldo >= 0 ? 'positive' : 'negative'}`}>
                {formatarValor(stats.saldo)}
              </p>
              <span className="dashboard-card-info">
                Receitas: {formatarValor(stats.totalReceitas)} | Despesas: {formatarValor(stats.totalDespesas)}
              </span>
            </div>
          </div>

          {/* Resumo Financeiro */}
          <div className="dashboard-summary">
            <h2 className="dashboard-subtitle">Resumo Financeiro</h2>
            <div className="dashboard-summary-grid">
              <div className="dashboard-summary-item receita">
                <span className="dashboard-summary-icon icon-chart-up"></span>
                <div>
                  <p className="dashboard-summary-label">Total de Receitas</p>
                  <p className="dashboard-summary-value">{formatarValor(stats.totalReceitas)}</p>
                </div>
              </div>
              
              <div className="dashboard-summary-item despesa">
                <span className="dashboard-summary-icon icon-chart-down"></span>
                <div>
                  <p className="dashboard-summary-label">Total de Despesas</p>
                  <p className="dashboard-summary-value">{formatarValor(stats.totalDespesas)}</p>
                </div>
              </div>
              
              <div className={`dashboard-summary-item saldo ${stats.saldo >= 0 ? 'positivo' : 'negativo'}`}>
                <span className={`dashboard-summary-icon ${stats.saldo >= 0 ? 'icon-money' : 'icon-warning'}`}></span>
                <div>
                  <p className="dashboard-summary-label">Saldo Líquido</p>
                  <p className="dashboard-summary-value">{formatarValor(stats.saldo)}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;