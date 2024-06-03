using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

public interface ICurrencyService
{
    Task<decimal> GetUsdExchangeRateAsync();
}

public class CurrencyService : ICurrencyService
{
    private readonly HttpClient _httpClient;

    public CurrencyService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<decimal> GetUsdExchangeRateAsync()
    {
        var response = await _httpClient.GetStringAsync("https://api.nbrb.by/exrates/rates/431");
        var json = JObject.Parse(response);
        return json["Cur_OfficialRate"].Value<decimal>();
    }
}