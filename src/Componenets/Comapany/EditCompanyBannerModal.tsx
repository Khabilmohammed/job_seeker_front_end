import React, { useState } from "react";
import { useUpdateCompanyMutation } from "../../Apis/companyApi";

interface EditCompanyBannerModalProps {
  company: any;
  onClose: () => void;
}

const EditCompanyBannerModal: React.FC<EditCompanyBannerModalProps> = ({ company, onClose }) => {
  const [formData, setFormData] = useState({
    bannerImage: company.banner || "",
    logoUrl: company.logoUrl || "",
    name: company.name || "",
    industry: company.industry || "",
    description: company.description || '',
    website: company.website || '',
    location: company.location || '',
    foundedYear: company.foundedYear || '',
    size: company.size || '',
    about: company.about || '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (id: number) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("industry", formData.industry);

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

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Tagline / Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Enter Company Tagline"
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

export default EditCompanyBannerModal;
