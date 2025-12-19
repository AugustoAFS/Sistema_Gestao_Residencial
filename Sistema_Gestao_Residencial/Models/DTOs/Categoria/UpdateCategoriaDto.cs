using Sistema_Gestao_Residencial.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Sistema_Gestao_Residencial.Models.DTOs.Categoria
{
    public class UpdateCategoriaDto
    {
        [Required(ErrorMessage = "O ID é obrigatório")]
        public int Id { get; set; }

        [Required(ErrorMessage = "A descrição é obrigatória")]
        [StringLength(255, MinimumLength = 3, ErrorMessage = "A descrição deve ter entre 3 e 255 caracteres")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "A finalidade é obrigatória")]
        public FinalidadeEnum Finalidade { get; set; }

        [Required(ErrorMessage = "O usuário é obrigatório")]
        public int UsuarioId { get; set; }
    }
}
