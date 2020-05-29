using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FMF_Backend.Data;
using FMF_Backend.Models;

namespace FMF_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Store3Controller : ControllerBase
    {
        private readonly FMFDbContext _context;

        public Store3Controller(FMFDbContext context)
        {
            _context = context;
        }

        // GET: api/Store3
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store3>>> GetStore3s()
        {
            return await _context.Store3s.ToListAsync();
        }

        // GET: api/Store3/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Store3>> GetStore3(long id)
        {
            var store3 = await _context.Store3s.FindAsync(id);

            if (store3 == null)
            {
                return NotFound();
            }

            return store3;
        }

        // PUT: api/Store3/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore3(long id, Store3 store3)
        {
            if (id != store3.Id)
            {
                return BadRequest();
            }

            _context.Entry(store3).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Store3Exists(id))
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

        // POST: api/Store3
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Store3>> PostStore3(Store3 store3)
        {
            _context.Store3s.Add(store3);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStore3", new { id = store3.Id }, store3);
        }

        // DELETE: api/Store3/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Store3>> DeleteStore3(long id)
        {
            var store3 = await _context.Store3s.FindAsync(id);
            if (store3 == null)
            {
                return NotFound();
            }

            _context.Store3s.Remove(store3);
            await _context.SaveChangesAsync();

            return store3;
        }

        private bool Store3Exists(long id)
        {
            return _context.Store3s.Any(e => e.Id == id);
        }
    }
}
