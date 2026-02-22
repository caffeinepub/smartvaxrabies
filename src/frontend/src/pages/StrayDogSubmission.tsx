import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { ExternalBlob } from '../backend';
import { Upload, Loader2, CheckCircle2, Image as ImageIcon } from 'lucide-react';

export default function StrayDogSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    uploadedBy: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !selectedFile) throw new Error('Missing required data');

      const arrayBuffer = await selectedFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      await actor.uploadStrayDogImage(blob, formData.location, formData.description, formData.uploadedBy);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strayDogImages'] });
      setShowSuccess(true);
      setFormData({ location: '', description: '', uploadedBy: '' });
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadProgress(0);
      setTimeout(() => setShowSuccess(false), 5000);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    uploadMutation.mutate();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help a Stray Dog</h1>
          <p className="text-lg text-gray-600">
            Upload photos of stray dogs to help connect them with shelters and caring families
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />
            <p className="text-emerald-800 font-medium">
              Thank you! Your submission has been received and will help this dog find care.
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Dog Photo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg shadow-md object-cover"
                    />
                    <label className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium hover:bg-emerald-200 cursor-pointer transition-colors">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        required={!selectedFile}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <ImageIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                )}
              </div>
            </div>

            {uploadMutation.isPending && uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                Location Found
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., Near Kochi Beach, Ernakulam"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                placeholder="Describe the dog's condition, behavior, and any other relevant details..."
              />
            </div>

            <div>
              <label htmlFor="uploadedBy" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="uploadedBy"
                name="uploadedBy"
                value={formData.uploadedBy}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <button
              type="submit"
              disabled={uploadMutation.isPending || !selectedFile}
              className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Submit Stray Dog Report
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
