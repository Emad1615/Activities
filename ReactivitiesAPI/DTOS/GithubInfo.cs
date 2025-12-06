using System.Text.Json.Serialization;

namespace API.DTOS
{
    public class GithubInfo
    {
        public class GithubAuthRequest
        {
            public required string Code { get; set; }
            [JsonPropertyName("client_id")]
            public required string ClientID { get; set; }
            [JsonPropertyName("client_secret")]
            public required string ClientSecret { get; set; }
            [JsonPropertyName("redirect_uri")]
            public required string RedirectURI { get; set; }
        }
        public class GitHubTokenRespons
        {
            [JsonPropertyName("access_token")]
            public string AccessToken { get; set; } = "";
        }
        public class GithubUser
        {
            public string Email { get; set; } = "";
            public string Name { get; set; } = "";
            [JsonPropertyName("avatar_url")]
            public string? ImageUrl { get; set; } = "";
        }
        public class Emails
        {
            public string Email { get; set; } = "";
            public bool Primary { get; set; }
            public bool Verified { get; set; }
        }
    }
}
