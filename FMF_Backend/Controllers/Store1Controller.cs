using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FMF_Backend.Models;

namespace FMF_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Store1Controller : ControllerBase
    {
        private readonly FMFContext _context;

        public Store1Controller(FMFContext context)
        {
            _context = context;
        }

        // GET: api/Store1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store1>>> GetStore1s()
        {
            return await _context.Store1s.ToListAsync();
        }

        // GET: api/Store1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Store1>> GetStore1(long id)
        {
            var store1 = await _context.Store1s.FindAsync(id);

            if (store1 == null)
            {
                return NotFound();
            }

            return store1;
        }

        // PUT: api/Store1/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore1(long id, Store1 store1)
        {
            if (id != store1.Id)
            {
                return BadRequest();
            }

            _context.Entry(store1).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Store1Exists(id))
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

        // POST: api/Store1
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Store1>> PostStore1(Store1 store1)
        {
            _context.Store1s.Add(store1);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStore1", new { id = store1.Id }, store1);
        }

        // DELETE: api/Store1/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Store1>> DeleteStore1(long id)
        {
            var store1 = await _context.Store1s.FindAsync(id);
            if (store1 == null)
            {
                return NotFound();
            }

            _context.Store1s.Remove(store1);
            await _context.SaveChangesAsync();

            return store1;
        }

        private bool Store1Exists(long id)
        {
            return _context.Store1s.Any(e => e.Id == id);
        }
    }
}
