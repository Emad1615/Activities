import { CloudUpload } from '@mui/icons-material';
import 'cropperjs/dist/cropper.css';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper, { type ReactCropperElement } from 'react-cropper';

type Props = {
  uploadImage: (file: Blob) => void;
  loadingImage: boolean;
};
export default function PhotoUploadWidget({
  uploadImage,
  loadingImage,
}: Props) {
  const [file, setFile] = useState<object & { preview: string }[]>([]);
  const cropperRef = useRef<ReactCropperElement>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file as Blob) })
      )
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const onCropper = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob((file) => {
      uploadImage(file as Blob);
    });
  }, [uploadImage]);
  useEffect(() => {
    return () => file.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [file]);
  return (
    <Grid container spacing={2}>
      <Grid size={{ xl: 4, lg: 3, md: 12, sm: 12, xs: 12 }}>
        <Typography variant="overline" color="secondary">
          Step 1 - ADD PHOTO
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: '1px dashed #cccc',
            height: 300,
            borderRadius: '5px',
            py: 5,
            px: 2,
            textAlign: 'center',
            borderColor: isDragActive ? 'green' : '#cccc',
          }}
        >
          <input {...getInputProps()} />
          <CloudUpload sx={{ fontSize: '5rem', color: 'text.disabled' }} />
          <Typography variant="h5" color="text.disabled">
            Drop Image Here
          </Typography>
        </Box>
      </Grid>
      <Grid size={{ xl: 4, lg: 3, md: 12, sm: 12, xs: 12 }}>
        {file[0]?.preview && (
          <>
            <Typography variant="overline" color="secondary">
              Step 2 - RESIZE IMAGE
            </Typography>
            <Cropper
              ref={cropperRef}
              src={file[0].preview}
              style={{ height: '300px', width: 260 }}
              initialAspectRatio={1}
              aspectRatio={1}
              viewMode={1}
              guides={false}
              background={false}
              preview={'.img-preview'}
            />
          </>
        )}
      </Grid>
      <Grid size={{ xl: 4, lg: 3, md: 12, sm: 12, xs: 12 }}>
        {file[0]?.preview && (
          <>
            <Typography variant="overline" color="secondary">
              Step 3 - PREVIEW & UPLOAD
            </Typography>
            <div
              className="img-preview"
              style={{
                minHeight: 300,
                width: 260,
                overflow: 'hidden',
                border: '1px solid #eeee',
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{ my: 1, width: 260 }}
              onClick={onCropper}
              disabled={loadingImage}
            >
              Upload Image
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}
