//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace ProductCatalog.Models
//{
//    public class PaginatedList
//    {
//    }
//}
using System;
using System.Collections.Generic;

public class PaginatedList<T>
{
    public List<T> Items { get; private set; }
    public int TotalItems { get; private set; }
    public int PageIndex { get; private set; }
    public int PageSize { get; private set; }
    public int TotalPages => (int)Math.Ceiling(TotalItems / (double)PageSize);

    public PaginatedList(List<T> items, int totalItems, int pageIndex, int pageSize)
    {
        Items = items;
        TotalItems = totalItems;
        PageIndex = pageIndex;
        PageSize = pageSize;
    }

    public bool HasPreviousPage => PageIndex > 1;
    public bool HasNextPage => PageIndex < TotalPages;
}

public class PagedResult<T>
{
    public List<T> Items { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalItems { get; set; }
}