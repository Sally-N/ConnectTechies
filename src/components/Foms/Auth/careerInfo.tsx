import React, { useMemo, useState } from "react";
import { SignUpButtonStyle } from "@/Utils/Theme/buttons";
import { Title, Text } from "@/Utils/Theme/customTheme";
import { AuthFormStyle } from "@/Utils/Theme/form";
import { styleText, spanStyle } from "@/Utils/Theme/styleText";
import { Row, Col, Input, Button, Grid, Select } from "antd"
import type { CheckboxProps } from 'antd';
import selectCountryList from "react-select-country-list";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { Props } from "./personalInfo";

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
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const CareerInfoComponent: React.FC<Props> = ({formData, setFormData}) => {
    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const options = useMemo(() => selectCountryList().getLabels(), [])

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
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

    return (
        <Row style={{ ...AuthFormStyle}}>
            <Col span={24}>
                <Row>
                    <Title level={3} style={{ textAlign: 'center', width: '100%', paddingBottom: '0px', marginBottom: '15px' }}>
                        Sign Up
                    </Title>
                    <Text type={'secondary'} style={{ textAlign: 'center', width: '100%', paddingBottom: '0px', marginBottom: '5px' }}>Please enter your details.</Text>
                </Row>
                <form style={{ padding: '20px' }}>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Country
                            </Text>
                            <Select options={options.map((item) => ({
                                value: item,
                                label: item,
                            }))}
                                value={country} onChange={changeHandler}
                                style={{ width: '100%' }} >


                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Specialization
                            </Text>
                            <Select options={
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
                                    }
                                ]
                            }
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText} >
                                <span style={spanStyle}>*</span>Level of profession
                            </Text>
                            <Select options={
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
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Upload Profile Photo
                            </Text>
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Col>
                    </Row>
                    <Row justify={'space-between'} align={'middle'}>
                        <Button type={'default'}>Previous</Button>
                        <Button type={'primary'} style={{ ...SignUpButtonStyle }}>Submit</Button>
                    </Row>
                </form>
            </Col>
        </Row >

    )
}

export default CareerInfoComponent;


