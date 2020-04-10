using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FMF_Backend.Models;
using FMF_Backend.Data;

namespace FMF_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Store2Controller : ControllerBase
    {
        private readonly FMFDbContext _context;

        public Store2Controller(FMFDbContext context)
        {
            _context = context;
        }

        // GET: api/Store2
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store2>>> GetStore2s()
        {
            return await _context.Store2s.ToListAsync();
        }

        // GET: api/Store2/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Store2>> GetStore2(long id)
        {
            var store2 = await _context.Store2s.FindAsync(id);

            if (store2 == null)
            {
                return NotFound();
            }

            return store2;
        }

        // PUT: api/Store2/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore2(long id, Store2 store2)
        {
            if (id != store2.Id)
            {
                return BadRequest();
            }

            _context.Entry(store2).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Store2Exists(id))
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

        // POST: api/Store2
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Store2>> PostStore2(Store2 store2)
        {
            _context.Store2s.Add(store2);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStore2", new { id = store2.Id }, store2);
        }

        // DELETE: api/Store2/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Store2>> DeleteStore2(long id)
        {
            var store2 = await _context.Store2s.FindAsync(id);
            if (store2 == null)
            {
                return NotFound();
            }

            _context.Store2s.Remove(store2);
            await _context.SaveChangesAsync();

            return store2;
        }

        private bool Store2Exists(long id)
        {
            return _context.Store2s.Any(e => e.Id == id);
        }
    }
}
