using Sistema_Gestao_Residencial.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Sistema_Gestao_Residencial.Models.DTOs.Transacao
{
    public class CreateTransacaoDto
    {
        [Required(ErrorMessage = "A descrição é obrigatória")]
        [StringLength(255, MinimumLength = 3, ErrorMessage = "A descrição deve ter entre 3 e 255 caracteres")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "O valor é obrigatório")]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero")]
        public decimal Valor { get; set; }

        [Required(ErrorMessage = "A categoria é obrigatória")]
        public int CategoriaId { get; set; }

        [Required(ErrorMessage = "A pessoa é obrigatória")]
        public int PessoaId { get; set; }
    }
}
