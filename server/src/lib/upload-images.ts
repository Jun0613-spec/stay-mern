import cloudinary from "../config/cloudinary";

export const uploadImages = async (imageFiles: Express.Multer.File[]) => {
  const imageUrls: string[] = [];

  for (const image of imageFiles) {
    const b64 = Buffer.from(image.buffer).toString("base64");

    let dataURI = "data:" + image.mimetype + ";base64," + b64;

    const response = await cloudinary.uploader.upload(dataURI);

    imageUrls.push(response.url);
  }

  return imageUrls;
};

export const uploadSingleImage = async (imageFile: Express.Multer.File) => {
  const b64 = Buffer.from(imageFile.buffer).toString("base64");

  let dataURI = "data:" + imageFile.mimetype + ";base64," + b64;

  const response = await cloudinary.uploader.upload(dataURI);

  return response.url;
};
