import React, { useMemo, useState } from "react";
import { SignUpButtonStyle } from "@/Utils/Theme/buttons";
import { Title, Text } from "@/Utils/Theme/customTheme";
import { AuthFormStyle } from "@/Utils/Theme/form";
import { styleText, spanStyle } from "@/Utils/Theme/styleText";
import { Row, Col, Input, Button, Grid, Select } from "antd"
import type { CheckboxProps } from 'antd';
import selectCountryList from "react-select-country-list";

const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

const { useBreakpoint } = Grid;


const CareerInfoComponent = () => {
    const [country, setCountry] = useState('')
    const options = useMemo(() => selectCountryList().getLabels(), [])

    function changeHandler(country: string) {
        setCountry(country)
    }

    const screens = useBreakpoint();
    const marginValues = {
        xs: "10px 10px",
        sm: "10px 20px",
        md: "20px 100px",
        lg: "20px 200px",
        xl: "20px 300px",
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
        <Row style={{ ...AuthFormStyle, margin: getMargin() }}>
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
                                style={{ width: '100%' }}  >


                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>

                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Specialization
                            </Text>
                            <Input placeholder="e.g frontend developer" />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Level of profession
                            </Text>
                            <Input placeholder="e.g beginner" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Upload Profile Photo
                            </Text>
                        </Col>
                    </Row>
                    <Button type={'primary'} style={{ ...SignUpButtonStyle }}>Sign Up</Button>
                </form>
            </Col>
        </Row>

    )
}

export default CareerInfoComponent;


