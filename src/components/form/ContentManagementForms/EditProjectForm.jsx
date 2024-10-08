import React, { useState, useRef, useEffect } from "react";
import FormTitle from "../../common/FormTitle";
import { MdOutlineClose } from "react-icons/md";
import Button from "../../common/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProjectForm = ({ closeForm, project }) => {
  const [projectName, setProjectName] = useState("");
  const [categories, setCategories] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const thumbnailInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  useEffect(() => {
    if (project) {
      setProjectName(project.name || "");
      setCategories(project.categories || "");
      setThumbnail(project.thumbnail || null);
      setImages(
        project.images?.map((img) => ({
          file: null,
          preview: img,
        })) || [],
      );
    }
  }, [project]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  const removeImage = (preview) => {
    setImages((prevImages) =>
      prevImages.filter((img) => img.preview !== preview),
    );
    if (imagesInputRef.current) {
      imagesInputRef.current.value = "";
    }
  };

  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!projectName || !categories) {
      setError("Please fill out all required fields.");
      return;
    }
    if (!thumbnail) {
      setError("Please upload a thumbnail image.");
      return;
    }
    if (images.length === 0) {
      setError("Please upload at least one project image.");
      return;
    }
    setError(null);

    // For testing purposes
    console.log("Project Name:", projectName);
    console.log("Categories:", categories);
    console.log("Thumbnail:", thumbnail);
    console.log(
      "Images:",
      images.map((img) => img.file?.name || img.preview),
    );

    // Handle form submission logic here
    toast.success("Saved successfully");
    closeForm();
  };

  return (
    <div className="relative mx-4 bg-white p-8 shadow-lg">
      <button
        type="button"
        className="absolute right-2 top-2 flex justify-end"
        onClick={closeForm}
      >
        <MdOutlineClose className="h-8 w-8 rounded-full p-1 hover:bg-secondary-200 active:bg-secondary-200 active:text-secondary-500" />
      </button>
      <FormTitle>Edit Projects</FormTitle>
      <div className="my-4 h-[1px] w-full bg-secondary-500"></div>
      <div className="max-h-[500px] overflow-y-auto bg-white md:max-h-[600px] md:max-w-[500px]">
        <form>
          {error && (
            <div className="rounded-md border border-red-700 bg-red-100 p-2 text-center text-xs text-red-700">
              {error}
            </div>
          )}
          {/* Project Name */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">
              Project Name:
            </label>
            <input
              type="text"
              name="project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="w-full border p-2 outline-none"
            />
          </div>
          {/* Categories */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">Categories:</label>
            <input
              type="text"
              name="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              required
              className="w-full border p-2 outline-none"
            />
          </div>
          {/* Thumbnail */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">Thumbnail:</label>
            <input
              type="file"
              name="thumbnail"
              ref={thumbnailInputRef}
              onChange={handleThumbnailChange}
              className="w-full border p-2 outline-none"
              accept="image/*"
            />
            {thumbnail && (
              <div className="relative mt-2 h-24 w-24">
                <img
                  src={thumbnail}
                  alt="Thumbnail Preview"
                  className="h-full w-full object-cover"
                />
                <MdOutlineClose
                  onClick={removeThumbnail}
                  className="absolute right-1 top-1 h-6 w-6 cursor-pointer rounded-full bg-white text-red-500 hover:bg-gray-200"
                />
              </div>
            )}
          </div>
          {/* Images */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">Images:</label>
            <input
              type="file"
              name="images"
              ref={imagesInputRef}
              onChange={handleImagesChange}
              className="w-full border p-2 outline-none"
              accept="image/*"
              multiple
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative h-24 w-24">
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <MdOutlineClose
                    onClick={() => removeImage(image.preview)}
                    className="absolute right-1 top-1 h-6 w-6 cursor-pointer rounded-full bg-white text-red-500 hover:bg-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-4">
            <Button variant="submit" size="sm" onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectForm;
