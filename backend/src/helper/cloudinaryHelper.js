import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({
  cloud_name: "dpnqikm5c",
  api_key: "843447912713448",
  api_secret: "IAbyXNhjtZD4JyWSlprCOFRNVZI"
});

const uploadImageOnCloudinary = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName
    });
    try {
      fs.unlinkSync(filePath)
    } catch (error) {
      console.log("failed to delete image from server", error)
    }
    return { public_id: result.public_id, secure_url: result.secure_url }
  }
  catch (error) {
    throw new Error(error)
  }
}
export { uploadImageOnCloudinary }
