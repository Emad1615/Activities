using System.Text.Json.Serialization;

namespace API.DTOS
{
    public class GoogleInfo
    {
        public class GoogleAuthRequest
        {
            public required string Code { get; set; }
            [JsonPropertyName("client_id")]
            public required string ClientID { get; set; }
            [JsonPropertyName("client_secret")]
            public required string ClientSecret { get; set; }
            [JsonPropertyName("redirect_uri")]
            public required string RedirectURI { get; set; }
            [JsonPropertyName("grant_type")]
            public required string GrantType { get; set; }
        }
        public class GoogleTokenResponse
        {
            [JsonPropertyName("access_token")]
            public string AccessToken { get; set; } = "";
        }
        public class GoogleUser
        {
            public string Email { get; set; } = "";
            public string Name { get; set; } = "";
            [JsonPropertyName("picture")]
            public string? ImageUrl { get; set; } = "";
        }
    }
}
