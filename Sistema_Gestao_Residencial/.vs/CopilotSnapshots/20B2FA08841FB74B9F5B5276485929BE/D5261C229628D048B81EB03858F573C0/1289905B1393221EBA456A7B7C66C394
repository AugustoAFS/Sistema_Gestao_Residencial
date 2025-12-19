using System.ComponentModel.DataAnnotations;

namespace Sistema_Gestao_Residencial.Models.DTOs.Usuario
{
    public class CreateUsuarioDto
    {
        [Required(ErrorMessage = "O nome é obrigatório")]
        [StringLength(255, MinimumLength = 3, ErrorMessage = "O nome deve ter entre 3 e 255 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "A idade é obrigatória")]
        [Range(1, 150, ErrorMessage = "A idade deve estar entre 1 e 150 anos")]
        public int Idade { get; set; }
    }
}
