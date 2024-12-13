using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dispensa.Data;
using Dispensa.models.dto;

namespace Dispensa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListaController : ControllerBase
    {
        private readonly DispensaContext _context;

        public ListaController(DispensaContext context)
        {
            _context = context;
        }

        // GET: api/Lista
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lista>>> GetLista()
        {
            return await _context.Lista.ToListAsync();
        }


        // PUT: api/Lista/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLista(int id, Lista lista)
        {
            if (id != lista.Id)
            {
                return BadRequest();
            }

            _context.Entry(lista).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Lista
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
       public async Task<ActionResult<Lista>> PostLista(CriarListaDTO criarListaDTO)
{
    var lista = new Lista
    {
        Produto = criarListaDTO.Produto,
        Quantidade = criarListaDTO.Quantidade,
        DataHora = DateTime.Now // Gera automaticamente a data de criação
    };

    _context.Lista.Add(lista); // Certifique-se de que _context.Listas é correto
    await _context.SaveChangesAsync();

    return CreatedAtAction("GetLista", new { id = lista.Id }, lista);
}



        // DELETE: api/Lista/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLista(int id)
        {
            var lista = await _context.Lista.FindAsync(id);
            if (lista == null)
            {
                return NotFound();
            }

            _context.Lista.Remove(lista);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ListaExists(int id)
        {
            return _context.Lista.Any(e => e.Id == id);
        }
    }
}
