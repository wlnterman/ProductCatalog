using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class CurrencyController : ControllerBase
{
    private readonly ICurrencyService _currencyService;

    public CurrencyController(ICurrencyService currencyService)
    {
        _currencyService = currencyService;
    }

    [HttpGet("usd-rate")]
    public async Task<IActionResult> GetUsdRate()
    {
        var rate = await _currencyService.GetUsdExchangeRateAsync();
        return Ok( rate );
    }
}