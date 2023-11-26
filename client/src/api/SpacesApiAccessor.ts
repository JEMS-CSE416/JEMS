import { S3, Endpoint } from 'aws-sdk';

const spacesEndpoint = new Endpoint('https://nyc3.digitaloceanspaces.com'); // Replace with your Spaces endpoint    

/**
 * Get the S3 client for the Digital Ocean Space
 * @returns
 */
async function getS3Client() {
    const s3 = new S3({
        endpoint: spacesEndpoint,
        accessKeyId: "DO00MMUPXEDVMB8CV2FV", // TO-DO: Remove direct access key
        secretAccessKey: "d76qlX1sDndpZ3623VuAUXp4SwP3mN1GcCewRvUjAGo", // TO-DO: Remove direct secret key
    });
    return s3;
}

/**
 * Upload a file to the Digital Ocean Space
 * @param file
 * @returns
 */
export async function uploadImage(file: File, filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            if (event.target === null || event.target.result === null) {
                reject(new Error('File read error'));
                return;
            }
            const s3 = await getS3Client();
            const params = {
                Bucket: 'jems-spaces',
                Key: `${filePath}/${file.name}`,
                Body: event.target.result,
                ContentType: file.type,
                ACL: 'public-read',
            };
            const data = await s3.upload(params).promise();
            resolve(data.Location);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

// Get object from Digital Ocean Space
export async function getImage(imageUrl: string): Promise<string> {
    const s3 = await getS3Client();
    const params = {
        Bucket: 'jems-spaces',
        Key: imageUrl,
    };
    const data = await s3.getObject(params).promise();
    if(data.Body){
        return data.Body.toString();
    }
    return 'no data';
}

// Delete object from Digital Ocean Space
export async function deleteImage(imageUrl: string): Promise<string> {
    const s3 = await getS3Client();
    const params = {
        Bucket: 'jems-spaces',
        Key: imageUrl,
    };
    await s3.deleteObject(params).promise();
    return 'Image deleted successfully';
}