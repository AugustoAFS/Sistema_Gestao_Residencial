using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sistema_Gestao_Residencial.Models
{
    public class TransacoesModel
    {
        [Key]
        public int Id { get; set; }

        [StringLength(255)]
        public string Descricao { get; set; } = string.Empty;

        public decimal Valor { get; set; }

        [ForeignKey("Categoria")]
        public int CategoriaId { get; set; }

        [ForeignKey("Pessoa")]
        public int PessoaId { get; set; }

        //Relacionamentos
        public virtual CategoriaModel? Categoria { get; set; }
        public virtual UsuarioModel? Pessoa { get; set; }
    }
}
