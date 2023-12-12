import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { MAP_TYPES } from '../../utils/global_utils';
import "./css/fileDropZone.css";

interface FileDropZoneProps {
  disabled?: boolean;
  fileUploadType: string;
  onFilesDrop: (file: File) => void;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ disabled, fileUploadType, onFilesDrop, ...props }) => {
  let acceptedFiles;
  console.log(disabled, "disabled");
  if(fileUploadType === "IMAGE_UPLOAD"){
    acceptedFiles = IMAGE_MIME_TYPE;
  }else if(fileUploadType === "MAP_UPLOAD"){
    acceptedFiles = MAP_TYPES;
  }

  return (
    <Dropzone
      disabled={disabled? true : false}
      onDrop={(file) => onFilesDrop(file[0])}
      onReject={(file) => console.log('rejected file', file)}
      maxSize={ (2 * 1024) ** 6}
      accept={acceptedFiles}
      multiple={true}
      className={disabled ? 'disabled' : ''}
      {...props}
    >
      <Group justify="center" gap="xs" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Idle>
          <IconPhoto
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag a file here or click to select file
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Files over 64mb are not supported.
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

export default FileDropZone;
