namespace Sistema_Gestao_Residencial.Models.DTOs.Transacao
{
    public class ListTransacaoDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public int CategoriaId { get; set; }
        public string NomeCategoria { get; set; } = string.Empty;
        public int PessoaId { get; set; }
        public string NomePessoa { get; set; } = string.Empty;
    }
}
