using Sistema_Gestao_Residencial.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sistema_Gestao_Residencial.Models
{
    public class CategoriaModel
    {
        [Key]
        public int Id { get; set; }

        [StringLength(255)]
        public string Descricao { get; set; } = string.Empty;

        public FinalidadeEnum Finalidade { get; set; }

        [ForeignKey("Pessoa")]
        public int UsuarioId { get; set; }

        //Relacionamento
        public virtual UsuarioModel? Usuario { get; set; }
    }
}
