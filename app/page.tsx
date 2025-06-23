"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Ruler, Upload, BarChart3, Download, X, CheckCircle, MoreHorizontal } from "lucide-react"

export default function AIBodyAnalyzer() {
  const [height, setHeight] = useState("170.00")
  const [weight, setWeight] = useState("75.00")
  const [gender, setGender] = useState("Male")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const validateFile = (file: File): string | null => {
    const maxSize = 200 * 1024 * 1024 // 200MB for videos
    const allowedTypes = [
      "video/mp4",
      "video/avi",
      "video/mov",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
      "video/mpeg",
    ]

    if (file.size > maxSize) {
      return "File size must be less than 200MB"
    }

    if (!allowedTypes.includes(file.type)) {
      return "Please upload a valid video file (MP4, AVI, MOV, MKV, MPEG4)"
    }

    return null
  }

  const handleFileSelect = async (file: File) => {
    const error = validateFile(file)
    if (error) {
      alert(error)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadedFile(file)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)

    const files = event.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setIsAnalyzed(false)
    setUploadProgress(0)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleAnalyze = () => {
    setIsAnalyzed(true)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      {/* <div className="flex justify-end p-4">
        <div className="flex items-center gap-2">
          <span>Deploy</span>
          <MoreHorizontal className="w-4 h-4" />
        </div>
      </div> */}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 p-6 bg-gray-800 h-full min-h-screen">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-6">Personal Information</h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="height" className="text-sm text-gray-300 mb-2 block">
                  Height (cm)
                </Label>
                <div className="flex items-center bg-gray-700 rounded">
                  <Input
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="bg-transparent border-none text-white flex-1"
                  />
                  <div className="flex">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-gray-600 px-3"
                      onClick={() => setHeight((prev) => (Number.parseFloat(prev) - 1).toFixed(2))}
                    >
                      −
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-gray-600 px-3"
                      onClick={() => setHeight((prev) => (Number.parseFloat(prev) + 1).toFixed(2))}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="weight" className="text-sm text-gray-300 mb-2 block">
                  Weight (kg)
                </Label>
                <div className="flex items-center bg-gray-700 rounded">
                  <Input
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="bg-transparent border-none text-white flex-1"
                  />
                  <div className="flex">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-gray-600 px-3"
                      onClick={() => setWeight((prev) => (Number.parseFloat(prev) - 1).toFixed(2))}
                    >
                      −
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-gray-600 px-3"
                      onClick={() => setWeight((prev) => (Number.parseFloat(prev) + 1).toFixed(2))}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="gender" className="text-sm text-gray-300 mb-2 block">
                  Gender
                </Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="bg-gray-700 border-none text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Male" className="text-white">
                      Male
                    </SelectItem>
                    <SelectItem value="Female" className="text-white">
                      Female
                    </SelectItem>
                    <SelectItem value="Other" className="text-white">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm font-medium">Video Requirements</span>
            </div>
            <div className="bg-blue-900/30 rounded-lg p-4 h-32"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 pt-[80px] pl-[60px] pr-6 pb-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Ruler className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold">AI Body Measurement Analyzer</h1>
            </div>
            <p className="text-gray-300">
              Upload a video of yourself and get accurate body measurements using AI pose detection!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Upload Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-sm">📹</span>
                </div>
                <h2 className="text-2xl font-semibold">Upload Video</h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-300">Choose a video file</p>

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver ? "border-blue-500 bg-blue-900/20" : "border-gray-600 bg-gray-800"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">Drag and drop file here</p>
                  <p className="text-gray-500 text-sm mb-4">limit 200mb per file-MP4, AVI, MOV, MKV, MPEG4</p>
                  <div>
                    <input
                      type="file"
                      accept="video/mp4,video/avi,video/mov,video/quicktime,video/x-msvideo,video/x-matroska,video/mpeg"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button type="button" className="bg-gray-700 hover:bg-gray-600 text-white cursor-pointer" asChild>
                        <span>Browse Files</span>
                      </Button>
                    </label>
                  </div>
                </div>

                {isUploading && (
                  <div className="bg-gray-800 p-4 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">Uploading...</span>
                      <span className="text-sm text-gray-300">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {uploadedFile && !isUploading && (
                  <div className="flex items-center justify-between bg-gray-800 p-3 rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-xs">📹</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-400">{formatFileSize(uploadedFile.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveFile}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {uploadedFile && !isUploading && (
                  <div className="flex items-center gap-2 bg-green-900/30 text-green-400 p-3 rounded">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Video uploaded successfully</span>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-8 h-8 text-pink-500" />
                <h2 className="text-2xl font-semibold">Results</h2>
              </div>

              {!isAnalyzed ? (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">👆</span>
                    <span className="text-blue-300">
                      Upload a video and click 'Analyze' to see your body measurements here!
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Ruler className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Your body measurements</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Height</p>
                      <p className="text-2xl font-bold">175.0 cm</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Chest</p>
                      <p className="text-2xl font-bold">75.0 cm</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Shoulders</p>
                      <p className="text-2xl font-bold">40.2 cm</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Weight</p>
                      <p className="text-2xl font-bold">72.0 kg</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Waist</p>
                      <p className="text-2xl font-bold">34.0 cm</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Inseam</p>
                      <p className="text-2xl font-bold">40.2 cm</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">BMI</p>
                      <p className="text-2xl font-bold">23.5</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Hip</p>
                      <p className="text-2xl font-bold">34.0 cm</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">BMI Category</p>
                      <p className="text-2xl font-bold">Normal weight</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm">
                      <span className="font-medium">BMI status:</span>{" "}
                      <span className="text-green-400">Normal weight (BMI: 25.5)</span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">AI pose Detection</h3>
                    <p className="text-gray-300 text-sm">
                      Here are sample frames showing how the AI detected your body pose:
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                          <div className="bg-gray-700 rounded-lg h-24"></div>
                          <p className="text-center text-sm text-gray-400">Frame {i}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Download className="w-6 h-6 text-blue-400" />
                      <h3 className="text-xl font-semibold">Download Results</h3>
                    </div>

                    <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 text-center space-y-4">
            <div className="h-px bg-gray-700 w-full"></div>

            {uploadedFile && !isAnalyzed && !isUploading && (
              <Button
                onClick={handleAnalyze}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full"
              >
                🔍 Analyze body measurements
              </Button>
            )}

            <div className="text-gray-500 text-sm space-y-1">
              <p>Powered by MediaPipe AI - Measurements are estimates for reference only</p>
              <p>For professional fitting or medical purposes, please consult qualified professionals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
