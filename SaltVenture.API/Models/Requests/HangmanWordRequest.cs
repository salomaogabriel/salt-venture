using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SaltVenture.API.Models.Request;

public class HangmanWordRequest
{
    [JsonProperty("word")]
    public string? Word { get; set; }
    
    [JsonProperty("definition")]
    public string? Definition { get; set; }

    [JsonProperty("pronunciation")]
    public string? Pronunciation { get; set; }
}