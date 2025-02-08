using System;

namespace ProductCatalog.Extensions
{
    public static class StringExtensions
    {
        public static bool ContainsIgnoreCase(this string source, string toCheck, StringComparison comp = StringComparison.OrdinalIgnoreCase)
        {
            return source?.IndexOf(toCheck, comp) >= 0;
        }
    }
}
