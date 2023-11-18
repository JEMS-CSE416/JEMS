import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

interface FileDropZoneProps {
  onFilesDrop: (files: File[]) => void;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFilesDrop, ...props }) => {
  const MAP_TYPES = {
    'application/json': ['.json'],
    'application/vnd.google-earth.kml+xml': ['.kml'],
    'application/octet-stream': ['.shp', '.dbf'],
    'application/zip': ['.zip'],
  }

  return (
    <Dropzone
      onDrop={(files) => onFilesDrop(files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={MAP_TYPES}
      multiple={true}
      {...props}
    >
      <Group justify="center" gap="xs" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

export default FileDropZone;