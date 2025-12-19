using AutoMapper;
using Sistema_Gestao_Residencial.Models;
using Sistema_Gestao_Residencial.Models.DTOs.Usuario;

namespace Sistema_Gestao_Residencial.Data.Mapper.AutoMaper
{
    public class UsuarioProfile : Profile
    {
        public UsuarioProfile()
        {
            // CreateUsuarioDto <-> UsuarioModel
            CreateMap<CreateUsuarioDto, UsuarioModel>()
                .ReverseMap();

            // UpdateUsuarioDto <-> UsuarioModel
            CreateMap<UpdateUsuarioDto, UsuarioModel>()
                .ReverseMap();

            // UsuarioModel -> ListUsuarioDto (apenas leitura)
            CreateMap<UsuarioModel, ListUsuarioDto>();
        }
    }
}
