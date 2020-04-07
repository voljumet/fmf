using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FMF_Backend;
using FMF_Backend.Models;
using FMF_Backend.Data;

namespace FMF_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroceryListController : ControllerBase
    {
        private readonly FMFDbContext _context;

        public GroceryListController(FMFDbContext context)
        {
            _context = context;
        }

        // GET: api/GroceryList
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroceryList>>> GetGroceryLists()
        {
            return await _context.GroceryLists.ToListAsync();
        }

        // GET: api/GroceryList/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GroceryList>> GetGroceryList(long id)
        {
            var groceryList = await _context.GroceryLists.FindAsync(id);

            if (groceryList == null)
            {
                return NotFound();
            }

            return groceryList;
        }

        // PUT: api/GroceryList/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroceryList(long id, GroceryList groceryList)
        {
            if (id != groceryList.Id)
            {
                return BadRequest();
            }

            _context.Entry(groceryList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroceryListExists(id))
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

        // POST: api/GroceryList
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<GroceryList>> PostGroceryList(GroceryList groceryList)
        {
            _context.GroceryLists.Add(groceryList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGroceryList", new { id = groceryList.Id }, groceryList);
        }

        // DELETE: api/GroceryList/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<GroceryList>> DeleteGroceryList(long id)
        {
            var groceryList = await _context.GroceryLists.FindAsync(id);
            if (groceryList == null)
            {
                return NotFound();
            }

            _context.GroceryLists.Remove(groceryList);
            await _context.SaveChangesAsync();

            return groceryList;
        }

        private bool GroceryListExists(long id)
        {
            return _context.GroceryLists.Any(e => e.Id == id);
        }
    }
}
