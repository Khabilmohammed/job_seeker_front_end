import React, { useState } from "react";
import { useUpdateCompanyMutation } from "../../Apis/companyApi";

interface EditCompanyModalProps {
  company: any;
  onClose: () => void;
}

const EditCompanyAboutModal: React.FC<EditCompanyModalProps> = ({ company, onClose }) => {
  const [formData, setFormData] = useState({
    name: company.name || "",
    description: company.description || "",
    website: company.website || "",
    industry: company.industry || "",
    location: company.location || "",
    foundedYear: company.foundedYear || "",
    size: company.size || "",
    about: company.about || "",
  });

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      if (name === "bannerFile") {
        setBannerFile(files[0]);
      } else if (name === "logoFile") {
        setLogoFile(files[0]);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (id: number) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("industry", formData.industry);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("foundedYear", formData.foundedYear);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("about", formData.about);

    if (bannerFile) formDataToSend.append("bannerImage", bannerFile);
    if (logoFile) formDataToSend.append("logoUrl", logoFile);

    try {
      const result = await updateCompany({ id, companyData: formDataToSend }).unwrap();
      console.log("Update success:", result);
      alert("Company updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update company");
    }
  };

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(company.companyId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Company Profile</h2>

        <div className="space-y-4">
          {/* Banner Image */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Banner Image</label>
            <input
              type="file"
              name="bannerFile"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Logo Image */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Logo Image</label>
            <input
              type="file"
              name="logoFile"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Company Name"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Enter Industry"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Company Description"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Website</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter Website URL"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter Location"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Founded Year */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Founded Year</label>
            <input
              type="number"
              name="foundedYear"
              value={formData.foundedYear}
              onChange={handleChange}
              placeholder="Enter Founded Year"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="Enter Size"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Enter Company About"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none disabled:bg-blue-300"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyAboutModal;
