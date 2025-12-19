using Microsoft.AspNetCore.Mvc;
using Sistema_Gestao_Residencial.Models.DTOs.Usuario;
using Sistema_Gestao_Residencial.Services.Interfaces;

namespace Sistema_Gestao_Residencial.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _service;
        
        public UsuarioController(IUsuarioService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListUsuarioDto>>> GetUsuarios()
        {
            try
            {
                var usuarios = await _service.GetAllUsuarios();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateUsuario(CreateUsuarioDto dto)
        {
            try
            {
                var response = await _service.CreateUsuario(dto);
                
                if (!response.Success)
                    return StatusCode(response.StatusCode, response);

                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUsuario(int id, UpdateUsuarioDto dto)
        {
            try
            {
                if (id != dto.Id)
                    return BadRequest("O ID da URL não corresponde ao ID do body");

                var response = await _service.UpdateUsuario(dto);
                
                if (!response.Success)
                    return StatusCode(response.StatusCode, response);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            try
            {
                var response = await _service.DeleteUsuario(id);
                
                if (!response.Success)
                    return StatusCode(response.StatusCode, response);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
