export interface FileInfo {
    fileType: string;
    fileContent: string | undefined;
}

export const initialFileInfo: FileInfo = {
    fileType: '',
    fileContent: undefined
};