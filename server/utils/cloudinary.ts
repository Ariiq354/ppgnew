import cloudinary from "cloudinary";
import type { UploadApiResponse, DeleteApiResponse } from "cloudinary";

export async function uploadCloudinary(preset: string, file: Buffer) {
  try {
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ upload_preset: preset }, (err, result) => {
            if (err) return reject(err);
            resolve(result as UploadApiResponse);
          })
          .end(file);
      }
    );

    return uploadResult;
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      message: "Failed to upload",
      data: err.message || err,
    });
  }
}

export async function deleteCloudinary(
  public_id: string
): Promise<DeleteApiResponse> {
  try {
    const deleteResult = await new Promise<DeleteApiResponse>(
      (resolve, reject) => {
        cloudinary.v2.uploader.destroy(
          public_id,
          { invalidate: true },
          (err, result) => {
            if (err) return reject(err);

            if (!result) {
              return reject(new Error("No response from Cloudinary"));
            }

            resolve(result as DeleteApiResponse);
          }
        );
      }
    );

    return deleteResult;
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete from Cloudinary",
      data: err?.message || String(err),
    });
  }
}

export function getPublicIdFromUrl(url: string): string {
  return url.split("/").slice(7).join("/").split(".")[0]!;
}
