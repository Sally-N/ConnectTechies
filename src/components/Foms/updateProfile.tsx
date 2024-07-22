import React, { useMemo, useState } from "react";
import { Title, Text } from "@/Utils/Theme/customTheme";
import { styleText, spanStyle } from "@/Utils/Theme/styleText";
import { Row, Col, Input, Button, Grid, Select } from "antd"
import type { CheckboxProps } from 'antd';
import selectCountryList from "react-select-country-list";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';

const { TextArea } = Input;

const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

const { useBreakpoint } = Grid;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //     message.error('You can only upload JPG/PNG file!');
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    // return isJpgOrPng && isLt2M;
    return isLt2M;
};

const UpdateUserProfileFormComponent: React.FC = () => {
    const [aboutBio, setAboutbio] = useState<string>('');
    const [linkedInUrl, setLinkedInUrl] = useState<string>('');
    const [portfolioUrl, setPortfolioUrl] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [level, setLevel] = useState<string>('');
    const [specialization, setSpecialization] = useState<string>('')
    const options = useMemo(() => selectCountryList().getLabels(), [])




    const handleChange: UploadProps['onChange'] = (info) => {
        console.log('info', info)
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setImage(info.fileList[0].originFileObj as File);
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
                // setFormData({ ...formData, image: info.fileList[0].originFileObj as File })
                // console.log(formData.image, 'lkjhhjkl;lkjh')
            });

        }




    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    function changeHandler(country: string) {
        setCountry(country)
    }

    const screens = useBreakpoint();
    const marginValues = {
        xs: "10px 10px",
        sm: "10px 20px",
        md: "20px 10px",
        lg: "20px 20px",
        xl: "20px 30px",
    };

    // Get the appropriate margin value based on the current screen size
    const getMargin = () => {
        if (screens.xl) return marginValues.xl;
        if (screens.lg) return marginValues.lg;
        if (screens.md) return marginValues.md;
        if (screens.sm) return marginValues.sm;
        return marginValues.xs; // default for xs and undefined
    };


    async function handleSubmit() {

        try {
            const formDataToSend = new FormData();
            // formDataToSend.append('userId', userId);
            console.log(formDataToSend, 'dfghjkl')

            formDataToSend.append('country', country);
            formDataToSend.append('specialization', specialization);
            formDataToSend.append('level', level);
            formDataToSend.append('image', image!);
            formDataToSend.append('aboutBio', aboutBio);
            formDataToSend.append('linkedInUrl', linkedInUrl);
            formDataToSend.append('portfolioUrl', portfolioUrl);

            // formDataToSend.append('image', formData.image as unknown as File,  )

            // if (formData.image) {
            //     formDataToSend.append('image', formData.image as File,); // Append the file to the form data
            // }
            // for (var pair of formDataToSend.entries()) {
            //     console.log(pair[0] + ', ' + pair[1]);

            // }


            // Object.entries(formData).forEach(([key, value]) => {
            //     formDataToSend.append(key, !value); // Voilà, an item is packed.
            //     // if (value instanceof File) {
            //     //     formDataToSend.append(key, value, value.name);
            //     // }
            //   });

            console.log(formDataToSend, 'fssss')
            const response = await fetch('/api/profile', {
                method: "POST",
                body: formDataToSend
            });

            const result = await response.json();
            console.log(result)

            // if (status == 201) {
            //     setFormData({
            //         firstname: '',
            //         lastname: '',
            //         email: '',
            //         password: '',
            //         confirmPassword: '',
            //         country: '',
            //         level: '',
            //         specialization: '',
            //         image: null,
            //     });
            //     setCurrent(0);
            //     toast.success('You have signed up successfully');
            //     window.location.href = ('/login')

            // }
            // else {
            //     setFormData({
            //         firstname: '',
            //         lastname: '',
            //         email: '',
            //         password: '',
            //         confirmPassword: '',
            //         country: '',
            //         level: '',
            //         specialization: '',
            //         image: null,
            //     });
            //     setCurrent(0);
            //     toast.error('Unable to create account');
            // }

            console.log("Success:", result);
        } catch (error) {
            console.log(error);
        }

        const response = await fetch('/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },

        })
        const result = await response.json();
        console.log(result);

    }

    return (
        <Row>
            <Col span={24}>
                <form style={{ padding: '20px', zIndex: 10, border: 'solid 1px #8c8c8c' }} encType="multipart/form-data">
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                Country
                            </Text>
                            <Select options={options.map((item) => ({
                                value: item,
                                label: item,
                            }))}
                                value={country}
                                onChange={changeHandler}
                                style={{ width: '100%' }}>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                Specialization
                            </Text>
                            <Input placeholder="Product Manager" value={specialization} onChange={(e) => e.target.value} />
                            {/* <Select options={
                                [
                                    {
                                        value: 'Mobile Developer',
                                        label: 'Mobile Developer'
                                    },
                                    {
                                        value: 'Web developer',
                                        label: 'Web Developer',
                                    },
                                    {
                                        value: 'Frontend Developer',
                                        label: 'Frontend Developer',
                                    },
                                    {
                                        value: 'Backend Developer',
                                        label: 'Backend Developer',

                                    },
                                    {
                                        value: 'FullStack Developer',
                                        label: 'Fullstack Developer'
                                    },
                                    {
                                        value: 'DevOps Developer',
                                        label: 'DevOps Developer',
                                    },
                                    {
                                        value: 'UI/UX Designer',
                                        label: 'UI/UX Designer',
                                    },
                                    {
                                        value: 'Cyber Security',
                                        label: 'Cyber Security',
                                    },
                                    {
                                        value: 'Technical Writer',
                                        label: 'Technical Writer',
                                    },
                                    {
                                        value: 'DevOps Developer',
                                        label: 'DevOps Developer',
                                    },
                                    {
                                        value: 'Cloud Engineer',
                                        label: 'Cloud Engineer',
                                    },
                                    {
                                        value: 'Data Scientist',
                                        label: 'Data Scientist',
                                    },
                                    {
                                        value: 'Network Engineer',
                                        label: 'Network Engineer',
                                    }
                                ]
                            }
                                value={specialization}
                                onChange={(value) => setSpecialization(value)}

                                style={{ width: '100%' }} /> */}
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText} >
                                Level of profession
                            </Text>
                            <Input value={level} onChange={(e) => e.target.value} />
                            {/* <Select options={
                                [
                                    {
                                        value: 'Beginner',
                                        label: 'Beginner'
                                    },
                                    {
                                        value: 'Intern',
                                        label: 'Intern',
                                    },
                                    {
                                        value: 'Student',
                                        label: 'Student',
                                    },
                                    {
                                        value: 'Intermediate',
                                        label: 'Intermediate'
                                    },
                                    {
                                        value: 'Advanced',
                                        label: 'Advanced',

                                    },

                                    {
                                        value: 'Expert',
                                        label: 'Expert',
                                    }
                                ]
                            }
                                value={level}
                                onChange={(value) => setLevel(value)}

                                style={{ width: '100%' }} /> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Text style={styleText}>
                                Upload Profile Photo
                            </Text>
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%' }} /> : uploadButton}
                            </Upload>
                        </Col>
                    </Row>
                    {/* <Row justify={'space-between'} align={'middle'}>
                        <Button type={'default'}>Previous</Button>
                        <Button type={'primary'} style={{ ...SignUpButtonStyle }}>Submit</Button>
                    </Row> */}
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText} >
                                About You(Profile Bio)
                            </Text>
                            <TextArea rows={4} value={aboutBio} onChange={(e) => setAboutbio(e.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ margin: '0 0 10px' }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                Industries
                            </Text>
                            <Select
                                mode="multiple"
                                defaultValue={['Technology']}
                                placeholder="Filled"
                                variant="filled"
                                style={{ width: '100% ' }}
                                options={[
                                    { value: 'Technology', label: 'Technology' },
                                    { value: 'Agriculture and Food', label: 'Agriculture and Food' },
                                    { value: 'Education', label: 'Education' },
                                    { value: 'Transport and Infrastructure', label: 'Transport and Infrastructure' },
                                    { value: 'Music and Entertainment', label: 'Music and Entertainment' },
                                    { value: 'Manufacturing and Engineering', label: 'Manufacturing and Engineering' },
                                    { value: 'Trade and Commerce', label: 'Trade and Commerce' },
                                    { value: 'Banking and Finance', label: 'Banking and Finance' },

                                ]}
                            />
                        </Col>

                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                LinkedIn
                            </Text>
                            <Input value={linkedInUrl} onChange={(e) => setLinkedInUrl(e.target.value)} />
                        </Col>
                    </Row><Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText} >
                                Website/Portfolio
                            </Text>
                            <Input value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} />
                        </Col>
                    </Row>
                    <Row justify={'end'} align={'middle'}>
                        <Button type={'primary'} onClick={handleSubmit}>Submit</Button>
                    </Row>
                </form>
            </Col>
        </Row >

    )
}

export default UpdateUserProfileFormComponent;


