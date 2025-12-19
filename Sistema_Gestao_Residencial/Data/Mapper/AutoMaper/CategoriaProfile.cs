using AutoMapper;
using Sistema_Gestao_Residencial.Models;
using Sistema_Gestao_Residencial.Models.DTOs.Categoria;

namespace Sistema_Gestao_Residencial.Data.Mapper.AutoMaper
{
    public class CategoriaProfile : Profile
    {
        public CategoriaProfile()
        {
            // CreateCategoriaDto <-> CategoriaModel
            CreateMap<CreateCategoriaDto, CategoriaModel>()
                .ReverseMap();

            // UpdateCategoriaDto <-> CategoriaModel
            CreateMap<UpdateCategoriaDto, CategoriaModel>()
                .ReverseMap();

            // CategoriaModel -> ListCategoriaDto (apenas leitura)
            CreateMap<CategoriaModel, ListCategoriaDto>()
                .ForMember(dest => dest.NomeUsuario, opt => opt.MapFrom(src => src.Usuario != null ? src.Usuario.Nome : string.Empty));
        }
    }
}
