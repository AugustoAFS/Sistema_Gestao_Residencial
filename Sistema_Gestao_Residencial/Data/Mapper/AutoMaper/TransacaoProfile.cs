using AutoMapper;
using Sistema_Gestao_Residencial.Models;
using Sistema_Gestao_Residencial.Models.DTOs.Transacao;

namespace Sistema_Gestao_Residencial.Data.Mapper.AutoMaper
{
    public class TransacaoProfile : Profile
    {
        public TransacaoProfile()
        {
            // CreateTransacaoDto <-> TransacoesModel
            CreateMap<CreateTransacaoDto, TransacoesModel>()
                .ReverseMap();

            // UpdateTransacaoDto <-> TransacoesModel
            CreateMap<UpdateTransacaoDto, TransacoesModel>()
                .ReverseMap();

            // TransacoesModel -> ListTransacaoDto (apenas leitura)
            CreateMap<TransacoesModel, ListTransacaoDto>()
                .ForMember(dest => dest.NomeCategoria, opt => opt.MapFrom(src => src.Categoria != null ? src.Categoria.Descricao : string.Empty))
                .ForMember(dest => dest.NomePessoa, opt => opt.MapFrom(src => src.Pessoa != null ? src.Pessoa.Nome : string.Empty));
        }
    }
}
