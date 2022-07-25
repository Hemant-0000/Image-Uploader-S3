import React, { useEffect, useState } from 'react'
import S3 from 'react-aws-s3'
import aws_sdk from 'aws-sdk'
import { v4 } from 'uuid';


const Upload = () => {

    const [file, setFile] = useState()
    const [allFiles, setAllFiles] = useState([])

    const config = {
        bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME,
        region: process.env.NEXT_PUBLIC_REGION,
        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    };

    const s3 = new aws_sdk.S3(config);

    const handleClick = async () => {

        const ReactS3Client = new S3(config);

        await ReactS3Client.uploadFile(file, `fileName-${file.name}_key-${v4()}`).then(data => {
            console.log(data)
            if (data.status === 204) { console.log("success") }
            else { console.log("fail") }
        }).catch(err => console.log(err))

    };

    useEffect(() => {
        async function fetch() {
            await s3.listObjects({ Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME }).promise().then(data => {
                setAllFiles(data.Contents)
            }).catch(err => console.log(err))
        }
        fetch()
    }, [])

    return (
        <>
            <div className='grid grid-cols-2'>
                <div className="flex col-span-1 h-fit fixed ml-40 mt-20">
                    <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">

                        <div className="m-4">
                            <label className="inline-block mb-2 text-gray-500">File Upload</label>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                    <div className="flex flex-col items-center justify-center pt-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                            Attach a file</p>
                                    </div>
                                    <input name='image' onChange={(e) => setFile(e.target.files[0])} type="file" className="opacity-0" />
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-center flex-col p-2">
                            {file ? <p>{file.name}</p> : <p>No file selected</p>}

                            <button onClick={handleClick} className="w-full my-2 px-4 py-2 text-white bg-[#3f51d8] rounded shadow-xl">
                                Upload
                            </button>

                        </div>

                    </div>
                </div>


                {allFiles.length > 0 && <p className='fixed right-[690px] text-xl py-8 top-[80px] font-bold text-gray-700 tracking-wider'>Your Uploads</p>}

                <div className='mt-32 col-span-1 left-[700px] fixed px-5 py-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-black h-[72vh] top-8 scroll-smooth w-fit'>
                    <div className=' h-fit '>
                        {allFiles.map(({ key }) => {
                            return <>
                                <div key={key + v4()} className="rounded-lg shadow-lg mb-5 overflow-hidden border h-fit w-[500px]  bg-white md:mx-0 lg:mx-0">
                                    <img className="w-full bg-cover w-[700px] h-[250px]" src={`https://imageuploader.s3.ap-south-1.amazonaws.com/${key}`} alt="Your image" />
                                </div>
                            </>
                        })}
                    </div>
                </div>


            </div>
        </>
    )
}

export default Upload