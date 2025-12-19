using Sistema_Gestao_Residencial.Models;
using Sistema_Gestao_Residencial.Models.DTOs.Response;
using Sistema_Gestao_Residencial.Models.DTOs.Usuario;

namespace Sistema_Gestao_Residencial.Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<IEnumerable<ListUsuarioDto>> GetAllUsuarios();
        Task<ResponseDto> CreateUsuario(CreateUsuarioDto dto);
        Task<ResponseDto> UpdateUsuario(UpdateUsuarioDto dto);
        Task<ResponseDto> DeleteUsuario(int id);
    }
}