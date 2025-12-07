using System.Text.Json.Serialization;

namespace API.DTOS
{
    public class FacebookInfo
    {
        public class FacebookAuthRequest
        {
            public required string Code { get; set; }
            [JsonPropertyName("client_id")]
            public required string ClientID { get; set; }
            [JsonPropertyName("client_secret")]
            public required string ClientSecret { get; set; }
            [JsonPropertyName("redirect_uri")]
            public required string RedirectURI { get; set; }
        }
        public class FacebookTokenResponse
        {
            [JsonPropertyName("access_token")]
            public string AccessToken { get; set; } = "";
        }

        public class FacebookUser
        {
            public string? Id { get; set; }
            public string? Name { get; set; }
            public string? Email { get; set; }
            public FacebookPicture? Picture { get; set; } = null;
        }

        public class FacebookPicture
        {
            public FacebookData? Data { get; set; }
        }

        public class FacebookData
        {
            public string? Url { get; set; }
        }
    }
}
