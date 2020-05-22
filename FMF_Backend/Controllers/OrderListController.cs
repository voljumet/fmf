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
    public class OrderListController : ControllerBase
    {
        private readonly FMFDbContext _context;

        public OrderListController(FMFDbContext context)
        {
            _context = context;
        }

        // GET: api/OrderList
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderList>>> GetOrderLists()
        {
            return await _context.OrderLists.ToListAsync();
        }

        // GET: api/OrderList/5
        [HttpGet("GetOrderList/{id}")]
        public async Task<ActionResult<OrderList>> GetOrderListDetails(int id)
        {
            var orderList = _context.OrderLists
                .Include(ordl => ordl.Shopper)
                .Include(ordl => ordl.Products)
                    // .ThenInclude(ordl => ordl.ProductName)


                .Where(ordl => ordl.Id == id)
                .FirstOrDefault();
            

            if (orderList == null)
            {
                return NotFound();
            }

            return orderList;
        }

        // GET: api/OrderList/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderList>> GetOrderList(int id)
        {
            var orderList = await _context.OrderLists.FindAsync(id);

            if (orderList == null)
            {
                return NotFound();
            }

            return orderList;
        }

        // PUT: api/OrderList/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderList(int id, OrderList orderList)
        {
            if (id != orderList.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderListExists(id))
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

        // POST: api/OrderList
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<OrderList>> PostOrderList(OrderList orderList)
        {
            _context.OrderLists.Add(orderList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderList", new { id = orderList.Id }, orderList);
        }

        // DELETE: api/OrderList/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderList>> DeleteOrderList(int id)
        {
            var orderList = await _context.OrderLists.FindAsync(id);
            if (orderList == null)
            {
                return NotFound();
            }

            _context.OrderLists.Remove(orderList);
            await _context.SaveChangesAsync();

            return orderList;
        }

        private bool OrderListExists(int id)
        {
            return _context.OrderLists.Any(e => e.Id == id);
        }
    }
}
