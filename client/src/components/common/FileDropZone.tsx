import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';

interface FileDropZoneProps {
  onFilesDrop: (file: File) => void;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFilesDrop, ...props }) => {
  const MAP_TYPES = {
    'application/json': ['.json'],
    'application/geo+json': ['.geojson'],
    'application/vnd.google-earth.kml+xml': ['.kml'],
    'application/octet-stream': ['.shp', '.dbf'],
    'application/zip': ['.zip'],
  }

  return (
    <Dropzone
      onDrop={(file) => onFilesDrop(file[0])}
      onReject={(file) => console.log('rejected file', file)}
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
        <Dropzone.Idle>
          <IconPhoto
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag files here or click to select file
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach a SHP/DBF file in a .zip. Files over 5mb are not supported. 
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

export default FileDropZone;
