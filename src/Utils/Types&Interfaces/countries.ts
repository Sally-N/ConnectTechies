declare namespace ReactSelectCountries {

    export interface CountryData {
        label: string,
        value: string,
    }

    interface LabelValueMap {
        [key: string]: string;
    }

    interface Countries {
        data: CountryData[];
        labelMap: LabelValueMap;
        valueMap: LabelValueMap;
    }


    interface NativeCountries extends Countries {
        nativeData: CountryData[]
    }


}


declare class CountryList {
    getValue(label: string): string;
    getLabel(value: string): string;
    getValues(): string[];
    getLabels(): string[];
    getValueList: ReactSelectCountries.LabelValueMap;
    getLabelList: ReactSelectCountries.LabelValueMap;
    getData(): ReactSelectCountries.CountryData[];
    setLabel(value: string, label: string): ReactSelectCountries.Countries;
    setEmpty(label: string): ReactSelectCountries.Countries;
    native(): ReactSelectCountries.NativeCountries;
       
}

declare function countryList(): CountryList

// export = countryList;
