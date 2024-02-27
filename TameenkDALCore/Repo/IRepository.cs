using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Core.Data
{

    /// <summary>
    /// Repository
    /// </summary>


    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        Task<List<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(int id);
        Task<TEntity> AddAsync(TEntity entity);
        Task UpdateAsync(TEntity entity);
        Task DeleteAsync(TEntity entity);
        Task Insert(TEntity entity);
        IQueryable<TEntity> Table { get; }
        IQueryable<TEntity> TableNoTracking { get; }
        Task InsertAsync(IEnumerable<TEntity> entity);
        Task DeleteAsync(IEnumerable<TEntity> entity);
        Task UpdateAsync(IEnumerable<TEntity> entity);

    }

}
