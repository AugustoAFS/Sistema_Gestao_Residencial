using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sistema_Gestao_Residencial.Models
{
    public class UsuarioModel
    {
        [Key]
        public int Id { get; set; }

        [StringLength(255)]
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }

        public ICollection<TransacoesModel>? Transacoes { get; set; }
    }
}