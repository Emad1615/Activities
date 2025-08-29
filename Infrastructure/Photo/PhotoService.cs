using Application.Interfaces;
using Application.Profiles.DTOS;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Photo
{
    public class PhotoService : IPhotoService
    {
        private readonly ICloudinary _cloudinary;
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var account = new Account()
            {
                Cloud = config.Value.CloudName,
                ApiKey = config.Value.ApiKey,
                ApiSecret = config.Value.ApiSecret
            };
            _cloudinary = new Cloudinary(account);
        }
        public async Task<PhotoUploadResult?> AddPhoto(IFormFile file)
        {
            if (file.Length > 0) {

                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Width(500).Height(500).Crop("fill"),
                    Folder = "UserPhotos"
                };
                var result=await _cloudinary.UploadAsync(uploadParams);
                if (result.Error is not null) { 
                    throw new Exception(result.Error.Message);
                }
                return new PhotoUploadResult { PublicId = result.PublicId, Url = result.SecureUrl.AbsoluteUri };
            }
            return null;
        }

        public async Task<DeletionResult> DeletePhoto(string id)
        {
            var deleParams = new DeletionParams(id);
            var result = await _cloudinary.DestroyAsync(deleParams);
            if (result.Error is not null)
            {
                throw new Exception(result.Error.Message);
            }
            return result;
        }
    }
}
