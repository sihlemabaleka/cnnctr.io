import {useState} from 'react';
import supabase from '../hooks/useSupabase';
import {Box, Center, Text} from '@chakra-ui/layout';
import Icon from '@chakra-ui/icon';
import {FaPen} from 'react-icons/fa';
import Image from 'next/image'

export default function AppIcon({ size, onUpload}) {
    const [avatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);


    async function uploadAvatar(event) {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                return new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let {error: uploadError} = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                return uploadError;
            }

            onUpload(filePath);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <Box align="center">
            {avatarUrl
                ? <Image
                    src={avatarUrl}
                    alt="Avatar"
                    className="avatar image"
                    style={{height: size, width: size}}
                />
                : <Center
                    className="avatar no-image"
                    borderRadius={25}
                    w={size}
                    h={size}
                    mx="auto"
                    border="1px solid grey"
                    mt="10px"
                    mb="15px"
                    shadow="xl"
                >
                    <Icon as={FaPen}/>
                </Center>}
            <div style={{width: size}}>
                <Box align="center" mb="30px">
                    <label
                        className="button primary block"
                        htmlFor="single"
                    >
                        {uploading
                            ? <Text
                                fontWeight="extrabold"
                                size="xs"
                                className="hover:cursor-pointer"
                            >
                                Uploading...
                            </Text>
                            : <div className="cursor-pointer">
                                Select
                            </div>}
                    </label>
                    <input
                        style={{
                            visibility: 'hidden',
                            position: 'absolute',
                        }}
                        type="file"
                        id="single"
                        accept="image/*"
                        onChange={uploadAvatar}
                        disabled={uploading}
                    />
                </Box>
            </div>
        </Box>
    );
}
