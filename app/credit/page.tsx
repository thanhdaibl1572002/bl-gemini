'use client'
import { FC, useMemo, useState } from 'react'
import styles from '@/app/credit/creadit.module.sass'
import RadioGroup from '@/components/forms/RadioGroup'
import TextField from '@/components/forms/TextField'
import Select from '@/components/forms/Select'
import Button from '@/components/forms/Button'
import { PiArrowFatRight } from 'react-icons/pi'
import { daiblColor, redColor } from '@/variables/variables'

interface ICreditProps {

}

interface IFormData {
    CODE_GENDER: string | null
    FLAG_OWN_CAR: number | null
    FLAG_OWN_REALTY: number | null
    CNT_CHILDREN: number | null
    AMT_INCOME_TOTAL: number | null
    NAME_INCOME_TYPE: string | null
    NAME_EDUCATION_TYPE: string | null
    NAME_FAMILY_STATUS: string | null
    NAME_HOUSING_TYPE: string | null
    DAYS_BIRTH: number | null
    DAYS_EMPLOYED: number | null
    OCCUPATION_TYPE: string | null
    CNT_FAM_MEMBERS: number | null
    ACCOUNT_AGE: number | null
}

const Credit: FC<ICreditProps> = ({ }) => {

    const [formData, setFormData] = useState<IFormData>({
        CODE_GENDER: null,
        FLAG_OWN_CAR: null,
        FLAG_OWN_REALTY: null,
        CNT_CHILDREN: null,
        AMT_INCOME_TOTAL: null,
        NAME_INCOME_TYPE: null,
        NAME_EDUCATION_TYPE: null,
        NAME_FAMILY_STATUS: null,
        NAME_HOUSING_TYPE: null,
        DAYS_BIRTH: null,
        DAYS_EMPLOYED: null,
        OCCUPATION_TYPE: null,
        CNT_FAM_MEMBERS: null,
        ACCOUNT_AGE: null,
    })

    const handleChange = (key: string, value: any): void => {
        if (value !== undefined && value !== '') {
            setFormData(prevFormData => ({
                ...prevFormData,
                [key]: value
            }))
        }
    }

    const handleSubmit = (): void => {

    }

    console.log(formData)

    return (
        <div className={styles._container}>
            <h1>Phân loại rủi ro tín dụng</h1>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong style={{ color: formData.CODE_GENDER !== null ? daiblColor : redColor }}>Giới tính</strong>
                    <RadioGroup
                        options={useMemo(() => [
                            { label: 'Nam', value: 'M' },
                            { label: 'Nữ', value: 'F' },
                        ], [])}
                        onChange={value => handleChange('CODE_GENDER', value)}
                    />
                </div>
                <div className={styles._col}>
                    <strong style={{ color: formData.FLAG_OWN_CAR !== null ? daiblColor : redColor }}>Sở hữu xe hơi</strong>
                    <RadioGroup
                        options={useMemo(() => [
                            { label: 'Có', value: '1' },
                            { label: 'Không', value: '0' },
                        ], [])}
                        onChange={value => handleChange('FLAG_OWN_CAR', value)}
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong style={{ color: formData.FLAG_OWN_REALTY !== null ? daiblColor : redColor }}>Sở hữu bất động sản</strong>
                    <RadioGroup
                        options={useMemo(() => [
                            { label: 'Có', value: '1' },
                            { label: 'Không', value: '0' },
                        ], [])}
                        onChange={value => handleChange('FLAG_OWN_REALTY', value)}
                    />
                </div>
                <div className={styles._col}>
                    <strong style={{ color: formData.AMT_INCOME_TOTAL !== null ? daiblColor : redColor }}>Thu nhập hàng năm ($)</strong>
                    <TextField
                        height={'fit-content'}
                        border='none'
                        focusBorder='none'
                        onChange={value => handleChange('AMT_INCOME_TOTAL', value)}
                        padding='0'
                        placeholder='vd: 3000'
                        type='number'
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong style={{ color: formData.NAME_INCOME_TYPE !== null ? daiblColor : redColor }}>Hạng mục thu nhập</strong>
                    <Select
                        width={'100%'}
                        options={useMemo(() => [
                            { label: 'Chọn hạng mục', value: null },
                            { label: 'Working', value: 'Working' },
                            { label: 'Commercial associate', value: 'Commercial associate' },
                            { label: 'Pensioner', value: 'Pensioner' },
                            { label: 'State servant', value: 'State servant' },
                        ], [])}
                        onChange={value => handleChange('NAME_INCOME_TYPE', value)}
                    />
                </div>
                <div className={styles._col}>
                    <strong style={{ color: formData.NAME_EDUCATION_TYPE !== null ? daiblColor : redColor }}>Trình độ học vấn</strong>
                    <Select
                        width={'100%'}
                        options={useMemo(() => [
                            { label: 'Chọn trình độ', value: null },
                            { label: 'Secondary / secondary special', value: 'Secondary / secondary special' },
                            { label: 'Higher education', value: 'Higher education' },
                            { label: 'Incomplete higher', value: 'Incomplete higher' },
                            { label: 'Lower secondary', value: 'Lower secondary' },
                        ], [])}
                        onChange={value => handleChange('NAME_EDUCATION_TYPE', value)}
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong style={{ color: formData.NAME_FAMILY_STATUS !== null ? daiblColor : redColor }}>Tình trạng hôn nhân</strong>
                    <Select
                        width={'100%'}
                        options={useMemo(() => [
                            { label: 'Chọn tình trạng hôn nhân', value: null },
                            { label: 'Married', value: 'Married' },
                            { label: 'Single / not married', value: 'Single / not married' },
                            { label: 'Widow', value: 'Widow' },
                            { label: 'Civil marriage', value: 'Civil marriage' },
                            { label: 'Separated', value: 'Separated' },
                        ], [])}
                        onChange={value => handleChange('NAME_FAMILY_STATUS', value)}
                    />
                </div>
                <div className={styles._col}>
                    <strong style={{ color: formData.NAME_HOUSING_TYPE !== null ? daiblColor : redColor }}>Nơi ở</strong>
                    <Select
                        width={'100%'}
                        options={useMemo(() => [
                            { label: 'Chọn nơi ở', value: null },
                            { label: 'House apartment', value: 'House apartment' },
                            { label: 'With parents', value: 'With parents' },
                            { label: 'Municipal apartment', value: 'Municipal apartment' },
                            { label: 'Office apartment', value: 'Office apartment' },
                            { label: 'Rented apartment', value: 'Rented apartment' },
                            { label: 'Co-op apartment', value: 'Co-op apartment' },
                        ], [])}
                        onChange={value => handleChange('NAME_HOUSING_TYPE', value)}
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong style={{ color: formData.DAYS_BIRTH !== null ? daiblColor : redColor }}>Ngày sinh</strong>
                    <TextField
                        width={'100%'}
                        height={'fit-content'}
                        border='none'
                        focusBorder='none'
                        onChange={value => handleChange('DAYS_BIRTH', value)}
                        padding='0'
                        type='date'
                    />
                </div>
                <div className={styles._col}>
                    <strong style={{ color: formData.DAYS_EMPLOYED !== null ? daiblColor : redColor }}>Ngày bắt đầu làm việc</strong>
                    <TextField
                        width={'100%'}
                        height={'fit-content'}
                        border='none'
                        focusBorder='none'
                        onChange={value => handleChange('DAYS_EMPLOYED', value)}
                        padding='0'
                        type='date'
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong style={{ color: formData.ACCOUNT_AGE !== null ? daiblColor : redColor }}>Ngày tạo tài khoản</strong>
                    <TextField
                        width={'100%'}
                        height={'fit-content'}
                        border='none'
                        focusBorder='none'
                        onChange={value => handleChange('ACCOUNT_AGE', value)}
                        padding='0'
                        type='date'
                    />
                </div>
                <div className={styles._col}>
                    <strong style={{ color: formData.CNT_FAM_MEMBERS !== null ? daiblColor : redColor }}>Số lượng thành viên gia đình</strong>
                    <TextField
                        width={'100%'}
                        height={'fit-content'}
                        border='none'
                        focusBorder='none'
                        onChange={value => handleChange('CNT_FAM_MEMBERS', value)}
                        padding='0'
                        type='number'
                        placeholder='vd: 3'
                    />
                </div>
            </div>
            <div className={styles._row}>
                <div className={styles._col}>
                    <strong style={{ color: formData.CNT_CHILDREN !== null ? daiblColor : redColor }}>Số lượng con cái</strong>
                    <TextField
                        width={'100%'}
                        height={'fit-content'}
                        border='none'
                        focusBorder='none'
                        onChange={value => handleChange('CNT_CHILDREN', value)}
                        padding='0'
                        type='number'
                        placeholder='vd: 2'
                    />
                </div>
                <div className={styles._col}>
                    <strong style={{ color: formData.OCCUPATION_TYPE !== null ? daiblColor : redColor }}>Nghề nghiệp</strong>
                    <Select
                        width={'100%'}
                        options={useMemo(() => [
                            { label: 'Chọn nghề nghiệp', value: null },
                            { label: 'Core staff', value: 'Core staff' },
                            { label: 'Laborers', value: 'Laborers' },
                            { label: 'Managers', value: 'Managers' },
                            { label: 'Sales staff', value: 'Sales staff' },
                            { label: 'Drivers', value: 'Drivers' },
                            { label: 'High skill tech staff', value: 'High skill tech staff' },
                            { label: 'Accountants', value: 'Accountants' },
                            { label: 'Security staff', value: 'Security staff' },
                            { label: 'Medicine staff', value: 'Medicine staff' },
                            { label: 'Cooking staff', value: 'Cooking staff' },
                            { label: 'Low-skill Laborers', value: 'Low-skill Laborers' },
                            { label: 'Cleaning staff', value: 'Cleaning staff' },
                            { label: 'IT staff', value: 'IT staff' },
                            { label: 'Secretaries', value: 'Secretaries' },
                            { label: 'Private service staff', value: 'Private service staff' },
                            { label: 'Waiters/barmen staff', value: 'Waiters/barmen staff' },
                            { label: 'HR staff', value: 'HR staff' },
                        ], [])}
                        onChange={value => handleChange('OCCUPATION_TYPE', value)}
                    />
                </div>
            </div>
            <div className={styles._submit}>
                <Button
                    buttonWidth={120}
                    buttonHeight={45}
                    buttonText='Phân Loại'
                    buttonTextSize={15}
                    buttonIcon={<PiArrowFatRight />}
                    buttonIconPosition={'right'}
                    buttonIconSize={20}
                    onClick={handleSubmit}
                    disabled={Object.values(formData).some(value => value === null)}
                />
            </div>
        </div>
    )
}

export default Credit

