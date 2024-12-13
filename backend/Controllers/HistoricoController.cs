using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dispensa.Data;
using DispensaInteligente;
using Dispensa.models.dto;

namespace Dispensa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoricoController : ControllerBase
    {
        private readonly DispensaContext _context;

        public HistoricoController(DispensaContext context)
        {
            _context = context;
        }

        // GET: api/Historico
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Historico>>> GetHistorico()
        {
            return await _context.Historico.ToListAsync();
        }

        
        // PUT: api/Historico/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHistorico(int id, Historico historico)
        {
            if (id != historico.Id)
            {
                return BadRequest();
            }

            _context.Entry(historico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HistoricoExists(id))
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

        // POST: api/Historico
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Historico>> PostHistorico(CriarHistoricoDTO criarHistoricoDTO)
{
    var historico = new Historico
    {
        Produto = criarHistoricoDTO.Produto,
        DataHora = DateTime.Now
    };

    _context.Historico.Add(historico);
    await _context.SaveChangesAsync();

    return CreatedAtAction("GetHistorico", new { id = historico.Id }, historico);
}


        // DELETE: api/Historico/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHistorico(int id)
        {
            var historico = await _context.Historico.FindAsync(id);
            if (historico == null)
            {
                return NotFound();
            }

            _context.Historico.Remove(historico);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HistoricoExists(int id)
        {
            return _context.Historico.Any(e => e.Id == id);
        }
    }
}
