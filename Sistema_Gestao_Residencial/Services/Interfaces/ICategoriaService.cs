using Sistema_Gestao_Residencial.Models;
using Sistema_Gestao_Residencial.Models.DTOs;
using Sistema_Gestao_Residencial.Models.DTOs.Categoria;
using Sistema_Gestao_Residencial.Models.DTOs.Response;

namespace Sistema_Gestao_Residencial.Services.Interfaces
{
    public interface ICategoriaService
    {
        Task<IEnumerable<ListCategoriaDto>> GetAllCategorias();
        Task<ResponseDto> CreateCategoria(CreateCategoriaDto dto);
        Task<ResponseDto> UpdateCategoria(UpdateCategoriaDto dto);
        Task<ResponseDto> DeleteCategoria(int id);
    }
}
