using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Sistema_Gestao_Residencial.Data;
using Sistema_Gestao_Residencial.Models;
using Sistema_Gestao_Residencial.Models.DTOs.Transacao;
using Sistema_Gestao_Residencial.Models.DTOs.Response;
using Sistema_Gestao_Residencial.Models.Enums;
using Sistema_Gestao_Residencial.Services.Interfaces;

namespace Sistema_Gestao_Residencial.Services
{
    public class TransacaoService : ITransacaoService
    {
        private readonly Sistema_Gestao_DbContext _context;
        private readonly IMapper _mapper;

        public TransacaoService(Sistema_Gestao_DbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ListTransacaoDto>> GetAllTransacoes()
        {
            var transacoes = await _context.Transacoes
                .Include(t => t.Categoria)
                .Include(t => t.Pessoa)
                .AsNoTracking()
                .ToListAsync();

            return _mapper.Map<IEnumerable<ListTransacaoDto>>(transacoes);
        }

        public async Task<ResponseDto> CreateTransacao(CreateTransacaoDto dto)
        {
            try
            {
                var pessoa = await _context.Usuarios.FindAsync(dto.PessoaId);
                if (pessoa == null)
                {
                    return new ResponseDto("Pessoa não encontrada", 404);
                }

                var categoria = await _context.Categorias.FindAsync(dto.CategoriaId);
                if (categoria == null)
                {
                    return new ResponseDto("Categoria não encontrada", 404);
                }

                // REGRA DE NEGÓCIO: Menor de idade (< 18 anos) só pode ter despesas
                if (pessoa.Idade < 18 && categoria.Finalidade == FinalidadeEnum.Receita)
                {
                    return new ResponseDto(
                        $"Menores de idade (idade atual: {pessoa.Idade}) não podem registrar receitas. Apenas despesas são permitidas.",
                        400);
                }

                var transacao = _mapper.Map<TransacoesModel>(dto);
                await _context.Transacoes.AddAsync(transacao);
                await _context.SaveChangesAsync();

                return new ResponseDto("Transação criada com sucesso", 201);
            }
            catch (Exception ex)
            {
                return new ResponseDto($"Erro ao criar transação: {ex.Message}", 500);
            }
        }

        public async Task<ResponseDto> UpdateTransacao(UpdateTransacaoDto dto)
        {
            try
            {
                var transacao = await _context.Transacoes.FindAsync(dto.Id);
                if (transacao == null)
                {
                    return new ResponseDto("Transação não encontrada", 404);
                }

                var pessoa = await _context.Usuarios.FindAsync(dto.PessoaId);
                if (pessoa == null)
                {
                    return new ResponseDto("Pessoa não encontrada", 404);
                }

                var categoria = await _context.Categorias.FindAsync(dto.CategoriaId);
                if (categoria == null)
                {
                    return new ResponseDto("Categoria não encontrada", 404);
                }

                // REGRA DE NEGÓCIO: Menor de idade (< 18 anos) só pode ter despesas
                if (pessoa.Idade < 18 && categoria.Finalidade == FinalidadeEnum.Receita)
                {
                    return new ResponseDto(
                        $"Menores de idade (idade atual: {pessoa.Idade}) não podem registrar receitas. Apenas despesas são permitidas.",
                        400);
                }

                _mapper.Map(dto, transacao);
                _context.Transacoes.Update(transacao);
                await _context.SaveChangesAsync();

                return new ResponseDto("Transação atualizada com sucesso", 200);
            }
            catch (Exception ex)
            {
                return new ResponseDto($"Erro ao atualizar transação: {ex.Message}", 500);
            }
        }

        public async Task<ResponseDto> DeleteTransacao(int id)
        {
            try
            {
                var transacao = await _context.Transacoes.FindAsync(id);
                if (transacao == null)
                {
                    return new ResponseDto("Transação não encontrada", 404);
                }

                _context.Transacoes.Remove(transacao);
                await _context.SaveChangesAsync();

                return new ResponseDto("Transação excluída com sucesso", 200);
            }
            catch (Exception ex)
            {
                return new ResponseDto($"Erro ao excluir transação: {ex.Message}", 500);
            }
        }
    }
}
