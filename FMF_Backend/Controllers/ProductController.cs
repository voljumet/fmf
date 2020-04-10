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
    public class ProductController : ControllerBase
    {
        private readonly FMFDbContext _context;

        public ProductController(FMFDbContext context)
        {
            _context = context;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts(){
            return await _context.Products
            .Select(x => ProductDTO(x))
            .ToListAsync();
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProduct(long id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return ProductDTO(product);
        }

        // PUT: api/Product/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductDTO(long id, ProductDTO productDTO)
        {
            if (id != productDTO.Id)
            {
                return BadRequest();
            }

            _context.Entry(productDTO).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Product
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ProductDTO>> PostProductDTO(ProductDTO productDTO)
        {
            var product = new Product{
                PriceFMF = productDTO.PriceFMF,
                ProductName = productDTO.ProductName,
                Supplier = productDTO.Supplier
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
            nameof(GetProduct),
            new { id = product.Id },
            ProductDTO(product));
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(long id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(long id)
        {
            return _context.Products.Any(e => e.Id == id);
        }

        private static ProductDTO ProductDTO(Product product) =>
        new ProductDTO
        {
            Id = product.Id,
            ProductName = product.ProductName,
            Supplier = product.Supplier,
            PriceFMF = product.PriceFMF
        };       
    }
}
