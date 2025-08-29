using Application.Profiles.DTOS;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPhotoService
    {
        Task<DeletionResult> DeletePhoto(string id);
        Task<PhotoUploadResult?> AddPhoto(IFormFile file);
    }
}
