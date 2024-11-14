import { FC, useRef, ChangeEvent } from "react";
import { ImageUpload } from "../utilsCloudinary/ImageUpload";




interface CustomImageFileInputProps {
  onChange: (file: File | null | string) => void;
}

export const CustomImageFileInput: FC<CustomImageFileInputProps> = ({
  onChange,
}) => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;



    try {
      const imageUrl = await ImageUpload(file);

      if (!imageUrl) {
        throw new Error("Image upload failed");
      }

      onChange(imageUrl);
    } catch (error) {
      
      console.error("Image upload error:", error);
    } finally {
      console.log('finally')
    }
  };

  return (
    <div>
      <div className="flex justify-center">
      </div>
      
      <h1
     
        className="bg-blue-600 text-white text-sm font-semibold py-2 mt-4 px-4 rounded"
        onClick={handleButtonClick}
      >
        Upload Image
      </h1>
      <p className="text-sm  my-2">
        {/* Click the button below to select an image */}
      </p>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*" 
        className="hidden"
      />
      {/* <p className="text-xs leading-5 p-1 text-gray-400">Image up to 10MB</p> */}
    </div>
  );
};