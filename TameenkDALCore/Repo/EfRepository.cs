using Microsoft.EntityFrameworkCore;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities;
using TameenkDAL;

namespace Tameenk.Data
{
    /// <summary>
    /// Entity Framework repository
    /// </summary>
    public class EfRepository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly YourDbContext _context;
        private readonly DbSet<TEntity> _dbSet;

        public EfRepository(YourDbContext context)
        {
            _context = context;
            //_dbSet = context.Set<TEntity>();
        }

        public async Task<List<TEntity>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            _dbSet.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task UpdateAsync(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(TEntity entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Insert(TEntity entity)
        {
            _dbSet.Add(entity);
            await _context.SaveChangesAsync();
        }
        IQueryable<TEntity> Table { get; }

        IQueryable<TEntity> TableNoTracking { get; }

        IQueryable<TEntity> IRepository<TEntity>.Table => throw new System.NotImplementedException();

        IQueryable<TEntity> IRepository<TEntity>.TableNoTracking => throw new System.NotImplementedException();
        public async Task InsertAsync(IEnumerable<TEntity> entity)
        {
            _dbSet.AddRange(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(IEnumerable<TEntity> entity)
        {
            _dbSet.RemoveRange(entity);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(IEnumerable<TEntity> entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}