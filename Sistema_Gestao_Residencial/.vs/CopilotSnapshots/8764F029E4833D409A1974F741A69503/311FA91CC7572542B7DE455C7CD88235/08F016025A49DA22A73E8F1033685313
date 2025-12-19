using Sistema_Gestao_Residencial.Models;
using Sistema_Gestao_Residencial.Models.DTOs.Transacao;
using Sistema_Gestao_Residencial.Models.DTOs.Response;

namespace Sistema_Gestao_Residencial.Services.Interfaces
{
    public interface ITransacaoService
    {
        Task<IEnumerable<ListTransacaoDto>> GetAllTransacoes();
        Task<ResponseDto> CreateTransacao(CreateTransacaoDto dto);
        Task<ResponseDto> UpdateTransacao(UpdateTransacaoDto dto);
        Task<ResponseDto> DeleteTransacao(int id);
    }
}
