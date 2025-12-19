using Sistema_Gestao_Residencial.Models.Enums;

namespace Sistema_Gestao_Residencial.Models.DTOs.Categoria
{
    public class ListCategoriaDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public FinalidadeEnum Finalidade { get; set; }
        public string FinalidadeDescricao => Finalidade.ToString();
        public int UsuarioId { get; set; }
        public string NomeUsuario { get; set; } = string.Empty;
    }
}
